import { FormHookProps } from '../../../utils/types';

export default function InputAccept(props: FormHookProps) {
  const { register, error } = props;

  return (
    <fieldset className="justify-start gap-x-16">
      <label htmlFor="accept">Accept T&C </label>
      <div>
        <input type="checkbox" id="accept" {...register('accept')} />
        <p>{error ? error : ''}</p>
      </div>
    </fieldset>
  );
}
