import { MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store/store';

export default function InputEmail(
  props: Record<'inputRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { inputRef } = props;
  const errorEmail = useSelector((state: RootState) => state.error.email);
  return (
    <fieldset>
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" ref={inputRef} />
      <p>{errorEmail ? errorEmail : ''}</p>
    </fieldset>
  );
}
