import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import type { RootState } from '../../redux/store/store';
import { Tile } from './Tile';

export function MainPage() {
  const formTiles = useSelector((state: RootState) => state.form.formTiles);

  return (
    <>
      <header>
        <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        <Link to="/hook-form">Hook Form</Link>
      </header>
      <main>
        {formTiles.map((tile, index) => (
          <Tile key={`tile-${index}`} tile={tile} />
        ))}
      </main>
    </>
  );
}

export default MainPage;
