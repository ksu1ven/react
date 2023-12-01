import { useEffect, useState } from 'react';
import { FormHookPasswordsProps } from '../../../utils/types';
import { showPasswordStrength } from '../../../utils/functions';

export default function InputPassword(props: FormHookPasswordsProps) {
  const {
    register,
    watchPassword,
    error: { errorPassword, errorPasswordRepeat },
  } = props;

  const [strength, setStrength] = useState(0);

  useEffect(() => {
    if (watchPassword)
      showPasswordStrength(watchPassword).then((strength) => {
        setStrength(strength);
      });
  }, [watchPassword]);

  return (
    <fieldset>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" {...register('password')} />
        <p>{errorPassword ? errorPassword : ''}</p>

        <label htmlFor="password-repeat">Repeat password:</label>
        <input
          type="text"
          id="password-repeat"
          {...register('passwordRepeat')}
        />
        <p>{errorPasswordRepeat ? errorPasswordRepeat : ''}</p>
      </div>
      {strength ? <div>Strength: {strength} of 4</div> : <></>}
    </fieldset>
  );
}
