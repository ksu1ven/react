import { FormHookProps } from '../../../utils/types';

export default function InputEmail(props: FormHookProps) {
  const { register, error } = props;

  return (
    <fieldset>
      <label htmlFor="email">Email:</label>
      <div>
        <input type="text" id="email" {...register('email')} />
        <p>{error ? error : ''}</p>
      </div>
    </fieldset>
  );
}
