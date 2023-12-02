import { useDispatch } from 'react-redux';
import { setNewFormAdded } from '../../redux/features/formSlice';
import { FormData } from '../../utils/types';

interface Props {
  tile: FormData;
  newFormAdded: boolean;
}

export function Tile(props: Props) {
  const { tile, newFormAdded } = props;

  const dispatch = useDispatch();

  if (newFormAdded) {
    setTimeout(() => dispatch(setNewFormAdded(false)), 2000);
  }

  return (
    <div
      className={
        newFormAdded
          ? 'flex m-auto w-1/2 gap-4 p-6 bg-red-300'
          : 'flex m-auto w-1/2 gap-4 p-6 bg-fuchsia-300'
      }
    >
      <img src={tile.image} className="h-32 max-w-xs" alt="formImf" />
      <ul>
        <li>
          Name: <span> {tile.name}</span>
        </li>
        <li>
          Age: <span> {tile.age}</span>
        </li>
        <li>
          Gender: <span> {tile.gender}</span>
        </li>
        <li>
          Country: <span> {tile.country}</span>
        </li>
        <li>
          Email: <span> {tile.email}</span>
        </li>
        <li>
          Password: <span> {tile.password}</span>
        </li>
      </ul>
    </div>
  );
}

export default Tile;
