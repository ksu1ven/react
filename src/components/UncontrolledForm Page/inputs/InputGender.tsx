import { MutableRefObject } from 'react';

export default function InputGender(
  props: Record<'genderRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { genderRef } = props;

  return (
    <fieldset className="flex flex-row justify-start gap-x-24 mb-5">
      <label>Gender: </label>
      <div className="flex grow justify-center gap-x-10">
        <div>
          <label htmlFor="male" className="mr-2">
            male
          </label>
          <input
            type="radio"
            id="male"
            name="gender"
            ref={genderRef}
            value="male"
            defaultChecked
          />
        </div>
        <div>
          <label htmlFor="female" className="mr-2">
            female
          </label>
          <input
            type="radio"
            id="female"
            name="gender"
            ref={genderRef}
            value="female"
          />
        </div>
      </div>
    </fieldset>
  );
}
