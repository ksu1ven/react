import React from 'react';
import { useRouter } from 'next/router';
import { updateQueryParams } from '../utils/helpFunctions';
import { Animal } from '../utils/types';

function Details(props: Record<'detailsData', Animal>) {
  const { detailsData } = props;
  const router = useRouter();
  return (
    <aside
      className="relative w-1/3 bg-lime-700 text-white flex flex-col pt-40 items-center gap-6"
      data-testid="details"
    >
      <button
        className="absolute top-14 right-14 flex items-center justify-center w-16 h-16 bg-lime-300 text-4xl p-3 rounded-full"
        data-testid="cross"
        onClick={() => {
          const newParams = updateQueryParams(router.query, 'details', '');
          router.push(newParams.toString() ? '?' + newParams : '');
        }}
      >
        X
      </button>

      <div>
        <h1
          className="text-5xl font-extrabold text-lime-300 mb-10"
          data-testid="details-h1"
        >
          {detailsData.name}
        </h1>
        <ul className="text-3xl font-extrabold">
          <li>Avian: {detailsData.avian ? 'Yes' : 'No'}</li>
          <li>Canine: {detailsData.canine ? 'Yes' : 'No'}</li>
          <li>EarthAnimal: {detailsData.earthAnimal ? 'Yes' : 'No'}</li>
          <li>EarthInsect: {detailsData.earthInsect ? 'Yes' : 'No'}</li>
          <li>Feline: {detailsData.feline ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </aside>
  );
}

export default Details;
