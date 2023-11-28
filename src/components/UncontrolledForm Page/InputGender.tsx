import { MutableRefObject } from 'react';

interface Props {
  maleRef: MutableRefObject<HTMLInputElement | null>;
  femaleRef: MutableRefObject<HTMLInputElement | null>;
}

export default function InputGender(props: Props) {
  const { femaleRef, maleRef } = props;
  return (
    <fieldset>
      <legend>Gender: </legend>
      <label htmlFor="male">male</label>
      <input
        type="radio"
        id="male"
        name="gender"
        ref={maleRef}
        defaultChecked
      />
      <label htmlFor="female">female</label>
      <input type="radio" id="female" name="gender" ref={femaleRef} />
    </fieldset>
  );
}
