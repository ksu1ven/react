import { MutableRefObject } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store/store';

export default function InputImage(
  props: Record<'inputRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { inputRef } = props;
  const errorImage = useSelector((state: RootState) => state.error.image);
  console.log(errorImage);
  return (
    <fieldset>
      <label htmlFor="image">Image: </label>
      <input type="file" id="image" ref={inputRef} />
      <p>{errorImage ? errorImage : ''}</p>
    </fieldset>
  );
}
