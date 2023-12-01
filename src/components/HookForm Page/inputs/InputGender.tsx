import { FormHookProps } from '../../../utils/types';

export default function InputGender(props: FormHookProps) {
  const { register } = props;
  return (
    <fieldset>
      <legend>Gender: </legend>
      <label htmlFor="male">male</label>
      <input
        type="radio"
        id="male"
        defaultChecked
        {...register('gender')}
        value="male"
      />
      <label htmlFor="female">female</label>
      <input type="radio" id="female" {...register('gender')} value="female" />
    </fieldset>
  );
}
