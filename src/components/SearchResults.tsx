import React from 'react';
import { useRouter } from 'next/router';
import { updateQueryParams } from '../utils/helpFunctions';
import { Animal } from '../utils/types';
import Image from 'next/image';
import pawImg from '../assets/paw.png';

function SearchResults(props: Record<'searchResults', readonly Animal[]>) {
  const { searchResults } = props;
  const router = useRouter();

  function checkDescription(animal: Animal) {
    const descriptionArr: string[] = [];
    Object.entries(animal).forEach((el) => {
      if (el[1] === true) {
        descriptionArr.push(el[0]);
      }
    });
    return descriptionArr.length
      ? descriptionArr.join(', ')
      : "API don't give us description :(";
  }

  return (
    <div
      className="w-1/3 m-auto mb-10 flex flex-col gap-5 "
      data-testid="search-results"
    >
      {searchResults.length ? (
        searchResults.map((el) => {
          const animalDescription = checkDescription(el);
          return (
            <div
              key={el.uid}
              className="flex justify-between gap-5 cursor-pointer"
              data-testid="card"
              onClick={() => {
                router.push(
                  '?' + updateQueryParams(router.query, 'details', el.name)
                );
              }}
            >
              <Image
                src={pawImg}
                alt="animal picture"
                className="w-16 h-16"
                width={100}
                height={100}
              />
              <div className="grow">
                <h2 className="font-extrabold mb-1">{el.name}</h2>
                <p>Description: {animalDescription}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-3xl" data-testid="no-found">
          Nothing found:(
        </p>
      )}
    </div>
  );
}

export default SearchResults;
