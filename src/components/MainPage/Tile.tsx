import { FormData } from '../../utils/types';

export function Tile(props: Record<'tile', FormData>) {
  const { tile } = props;

  return (
    <section className="flex">
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
