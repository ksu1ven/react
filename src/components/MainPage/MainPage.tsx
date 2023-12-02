import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import type { RootState } from '../../redux/store/store';
import { Tile } from './Tile';

export function MainPage() {
  const { formTiles, newFormAdded } = useSelector(
    (state: RootState) => state.form
  );

  return (
    <main className="h-full min-h-screen bg-amber-100">
      <header className="flex justify-center p-6 bg-amber-100">
        <nav className="flex justify-between w-1/3">
          <Link
            to="/uncontrolled-form"
            className="bg-fuchsia-800 px-10 py-2 border-solid border-t border-fuchsia-200 text-fuchsia-50"
          >
            Uncontrolled Form
          </Link>
          <Link
            to="/hook-form"
            className="bg-fuchsia-800 px-10 py-2 border-solid border-t border-fuchsia-200 text-fuchsia-50 min-w-2"
          >
            Hook Form
          </Link>
        </nav>
      </header>
      <h1 className="text-center text-2xl font-bold text-fuchsia-800 uppercase mb-2">
        List of forms
      </h1>
      <section className="flex flex-col pb-10 gap-10">
        {formTiles.length ? (
          formTiles.map((tile, index) => (
            <Tile
              key={`tile-${index}`}
              tile={tile}
              newFormAdded={newFormAdded && index === 0 ? newFormAdded : false}
            />
          ))
        ) : (
          <h2 className="text-center text-lg font-bold text-fuchsia-800 uppercase">
            No submitted forms:( <br />
            Please, fill out and submit the form.
          </h2>
        )}
      </section>
    </main>
  );
}

export default MainPage;
