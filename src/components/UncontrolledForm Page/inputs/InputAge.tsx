import { MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store/store';

export default function InputAge(
  props: Record<'inputRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { inputRef } = props;
  const errorAge = useSelector((state: RootState) => state.error.age);

  return (
    <fieldset>
      <label htmlFor="age">Age:</label>
      <div>
        <input type="text" id="age" ref={inputRef} />
        <p>{errorAge ? errorAge : ''}</p>
      </div>
    </fieldset>
  );
}
