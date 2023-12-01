import { MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store/store';

export default function InputName(
  props: Record<'inputRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { inputRef } = props;
  const errorName = useSelector((state: RootState) => state.error.name);

  return (
    <fieldset>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" ref={inputRef} />
      <p>{errorName ? errorName : ''}</p>
    </fieldset>
  );
}
