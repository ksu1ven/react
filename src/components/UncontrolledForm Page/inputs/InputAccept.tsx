import { MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store/store';

export default function InputAccept(
  props: Record<'inputRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { inputRef } = props;
  const errorAccept = useSelector((state: RootState) => state.error.accept);

  return (
    <fieldset>
      <label htmlFor="accept">accept T&C </label>
      <input type="checkbox" id="accept" ref={inputRef} />
      <p>{errorAccept ? errorAccept : ''}</p>
    </fieldset>
  );
}
