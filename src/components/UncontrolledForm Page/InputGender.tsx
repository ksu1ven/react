import { MutableRefObject } from 'react';

export default function InputGender(
  props: Record<'genderRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { genderRef } = props;
  return (
    <fieldset>
      <legend>Gender: </legend>
      <label htmlFor="male">male</label>
      <input
        type="radio"
        id="male"
        name="gender"
        ref={genderRef}
        value="male"
        defaultChecked
      />
      <label htmlFor="female">female</label>
      <input
        type="radio"
        id="female"
        name="gender"
        ref={genderRef}
        value="female"
      />
    </fieldset>
  );
}
