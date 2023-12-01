import { FormHookProps } from '../../utils/types';

export default function InputName(props: FormHookProps) {
  const { register, error } = props;

  return (
    <fieldset>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" {...register('name')} />
      <p>{error ? error : ''}</p>
    </fieldset>
  );
}
