import { FormHookProps } from '../../utils/types';

export default function InputAccept(props: FormHookProps) {
  const { register, error } = props;

  return (
    <fieldset>
      <label htmlFor="accept">accept T&C </label>
      <input type="checkbox" id="accept" {...register('accept')} />
      <p>{error ? error : ''}</p>
    </fieldset>
  );
}
