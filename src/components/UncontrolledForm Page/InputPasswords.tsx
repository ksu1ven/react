import { MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store/store';

interface Props {
  passwordRef: MutableRefObject<HTMLInputElement | null>;
  passwordRepeatRef: MutableRefObject<HTMLInputElement | null>;
}

export default function InputPassword(props: Props) {
  const { passwordRef, passwordRepeatRef } = props;
  const errorPassword = useSelector((state: RootState) => state.error.password);
  const errorPasswordRepeat = useSelector(
    (state: RootState) => state.error.passwordRepeat
  );

  return (
    <fieldset>
      <label htmlFor="password">Password:</label>
      <input type="text" id="password" ref={passwordRef} />
      <p>{errorPassword ? errorPassword : ''}</p>

      <label htmlFor="password-repeat">Repeat password:</label>
      <input type="text" id="password-repeat" ref={passwordRepeatRef} />
      <p>{errorPasswordRepeat ? errorPasswordRepeat : ''}</p>
    </fieldset>
  );
}
