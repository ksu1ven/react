import { FormHookProps } from '../../../utils/types';

export default function InputGender(props: FormHookProps) {
  const { register } = props;
  return (
    <fieldset className="flex flex-row justify-start gap-x-24 mb-5">
      <label>Gender: </label>
      <div className="flex grow justify-center gap-x-10">
        <div>
          <label htmlFor="male">male</label>
          <input
            type="radio"
            id="male"
            defaultChecked
            {...register('gender')}
            value="male"
          />
        </div>
        <div>
          <label htmlFor="female">female</label>
          <input
            type="radio"
            id="female"
            {...register('gender')}
            value="female"
          />
        </div>
      </div>
    </fieldset>
  );
}
