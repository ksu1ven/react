import { FormData } from '../../utils/types';

interface Props {
  tile: FormData;
  newFormAdded: boolean;
}

export function Tile(props: Props) {
  const { tile, newFormAdded } = props;

  return (
    <section className={newFormAdded ? 'flex bg-red-500' : 'flex'}>
      <img src={tile.image} className="w-20" alt="formImf" />
      <ul>
        <li>Name: {tile.name}</li>
        <li>Age: {tile.age}</li>
        <li>Gender: {tile.gender}</li>
        <li>Country:{tile.country}</li>
        <li>Email: {tile.email}</li>
        <li>Password: {tile.password}</li>
      </ul>
    </section>
  );
}

export default Tile;
