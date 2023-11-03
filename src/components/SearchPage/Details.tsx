import { useSearchParams, useLoaderData } from 'react-router-dom';
import Loader from '../Loader';
import { Animal, apiResponse } from '../../utils/types';
import { useState } from 'react';
import { updateQueryParams } from '../../utils/helpFunctions';

function Details() {
  const [params, setParams] = useSearchParams();
  const [isLoading] = useState(false);
  const animal = useLoaderData() as Animal | null;
  console.log(animal);

  return params.has('details') ? (
    <aside className="relative w-1/3 bg-lime-700 text-white flex flex-col pt-40 items-center gap-6">
      {!isLoading ? (
        <>
          <button
            className="absolute top-14 right-14 flex items-center justify-center w-16 h-16 bg-lime-300 text-4xl p-3 rounded-full"
            onClick={() => {
              setParams(updateQueryParams(params, 'details', ''));
            }}
          >
            X
          </button>
          <h1 className="text-5xl font-extrabold text-lime-300">
            {animal?.name}
          </h1>
          <ul className="text-3xl font-extrabold">
            <li>Avian: {animal?.avian ? 'Yes' : 'No'}</li>
            <li>Canine: {animal?.canine ? 'Yes' : 'No'}</li>
            <li>EarthAnimal: {animal?.earthAnimal ? 'Yes' : 'No'}</li>
            <li>EarthInsect: {animal?.earthInsect ? 'Yes' : 'No'}</li>
            <li>Feline: {animal?.feline ? 'Yes' : 'No'}</li>
          </ul>
        </>
      ) : (
        <Loader />
      )}
    </aside>
  ) : (
    ''
  );
}

export async function loader(): Promise<Animal | null> {
  try {
    const animalName = new URL(location.href).searchParams.get('details');
    if (animalName) {
      const response = await fetch(
        'https://stapi.co/api/v1/rest/animal/search?pageNumber=0&pageSize=100',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `${encodeURIComponent('name')}=${encodeURIComponent(
            animalName
          )}`,
        }
      );
      const json: apiResponse = await response.json();
      return json.animals[0];
    }
    return null;
  } catch {
    throw new Error('No such uid');
  }
}

export default Details;
