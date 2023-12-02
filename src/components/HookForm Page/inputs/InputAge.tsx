import { FormHookProps } from '../../../utils/types';

export default function InputAge(props: FormHookProps) {
  const { register, error } = props;

  return (
    <fieldset>
      <label htmlFor="age">Age:</label>
      <div>
        <input type="text" id="age" {...register('age')} />
        <p>{error ? error : ''}</p>
      </div>
    </fieldset>
  );
}
