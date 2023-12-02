import { MutableRefObject, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store/store';
import starEmpty from '../../../assets/silver-star-empty.png';
import starFull from '../../../assets/silver-star-full.png';
import eyeClosed from '../../../assets/eye-closed.png';
import eyeOpened from '../../../assets/eye-open.png';

interface Props {
  passwordRef: MutableRefObject<HTMLInputElement | null>;
  passwordRepeatRef: MutableRefObject<HTMLInputElement | null>;
  strength: number;
}

export default function InputPassword(props: Props) {
  const { passwordRef, passwordRepeatRef, strength } = props;
  const errorPassword = useSelector((state: RootState) => state.error.password);
  const errorPasswordRepeat = useSelector(
    (state: RootState) => state.error.passwordRepeat
  );
  const starsArr = new Array(4).fill(false).map((_, ind) => {
    if (ind < strength) return true;
    return false;
  });
  const [passwordType, setPasswordType] = useState('password');

  return (
    <fieldset className="w-full">
      <div className="flex flex-col w-9/12">
        <div className="flex justify-between">
          <label htmlFor="password">Password:</label>
          <div className="relative">
            <input type={passwordType} id="password" ref={passwordRef} />
            <button
              type="button"
              className="absolute top-1 right-2 w-6 z-10"
              onClick={() =>
                setPasswordType(
                  passwordType === 'password' ? 'text' : 'password'
                )
              }
            >
              <img
                src={passwordType === 'password' ? eyeClosed : eyeOpened}
                alt="password-type"
              />
            </button>
            <p>{errorPassword ? errorPassword : ''}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="password-repeat">Repeat password:</label>
          <div>
            <input
              type={passwordType}
              id="password-repeat"
              ref={passwordRepeatRef}
            />
            <p>{errorPasswordRepeat ? errorPasswordRepeat : ''}</p>
          </div>
        </div>
      </div>
      {strength > 0 ? (
        <div className="text-cyan-50 flex flex-col">
          Strength:
          <div className="flex">
            {starsArr.map((el, ind) => {
              if (el)
                return (
                  <img
                    key={`star-${ind}`}
                    src={starFull}
                    alt="star-full"
                    className="w-6 h-6"
                  />
                );
              return (
                <img
                  key={`star-${ind}`}
                  src={starEmpty}
                  alt="star-full"
                  className="w-6 h-6"
                />
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </fieldset>
  );
}
