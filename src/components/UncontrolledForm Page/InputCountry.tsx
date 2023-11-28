import { MutableRefObject } from 'react';

export default function InputCountry(
  props: Record<'inputRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { inputRef } = props;
  return (
    <fieldset>
      <label htmlFor="country">Country:</label>
      <input type="text" id="country" ref={inputRef} />
    </fieldset>
  );
}
