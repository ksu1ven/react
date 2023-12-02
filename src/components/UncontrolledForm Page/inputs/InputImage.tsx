import { MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store/store';

export default function InputImage(
  props: Record<'inputRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { inputRef } = props;
  const errorImage = useSelector((state: RootState) => state.error.image);

  return (
    <fieldset>
      <label htmlFor="image">Image: </label>
      <div>
        <input type="file" id="image" ref={inputRef} />
        <p>{errorImage ? errorImage : ''}</p>
      </div>
    </fieldset>
  );
}
