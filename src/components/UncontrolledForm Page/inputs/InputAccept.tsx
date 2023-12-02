import { MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store/store';

export default function InputAccept(
  props: Record<'inputRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { inputRef } = props;
  const errorAccept = useSelector((state: RootState) => state.error.accept);

  return (
    <fieldset className="justify-start gap-x-16">
      <label htmlFor="accept">Accept T&C </label>
      <div>
        <input type="checkbox" id="accept" ref={inputRef} />
        <p>{errorAccept ? errorAccept : ''}</p>
      </div>
    </fieldset>
  );
}
