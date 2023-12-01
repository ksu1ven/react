import { FormHookProps } from '../../../utils/types';

export default function InputImage(props: FormHookProps) {
  const { register, error } = props;

  return (
    <fieldset>
      <label htmlFor="image">Image: </label>
      <input type="file" id="image" {...register('image')} />
      <p>{error ? error : ''}</p>
    </fieldset>
  );
}
