import { MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store/store';

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

  return (
    <fieldset>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" ref={passwordRef} />
        <p>{errorPassword ? errorPassword : ''}</p>

        <label htmlFor="password-repeat">Repeat password:</label>
        <input type="text" id="password-repeat" ref={passwordRepeatRef} />
        <p>{errorPasswordRepeat ? errorPasswordRepeat : ''}</p>
      </div>
      {strength ? <div>Strength: {strength} of 4</div> : <></>}
    </fieldset>
  );
}
