import React from 'react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { updateQueryParams } from '../utils/helpFunctions';

function SearchForm(props: Record<'searchValue', string>) {
  const { searchValue } = props;
  const inputCurrentValue = useRef(searchValue);
  const [errorOccured, setErrorOccured] = useState(false);

  const router = useRouter();

  if (errorOccured) {
    throw new Error("Hello, I'm Error!");
  }
  return (
    <form
      action="#"
      className="w-3/5 flex justify-center m-auto gap-x-10 rounded"
      data-testid="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        localStorage.setItem('search', inputCurrentValue.current);
        if (searchValue !== inputCurrentValue.current)
          router.push(
            '?' +
              updateQueryParams(
                router.query,
                'search',
                inputCurrentValue.current
              )
          );
      }}
    >
      <button
        type="button"
        className="w-1/5 bg-lime-700 p-3 rounded text-white font-extrabold"
        onClick={() => {
          setErrorOccured(true);
        }}
      >
        Error
      </button>

      <input
        defaultValue={searchValue}
        type="text"
        name="search"
        id="search"
        data-testid="search-input"
        className="w-1/3 p-3"
        onChange={(e) => {
          e.target.value = e.target.value.trim();
          inputCurrentValue.current = e.target.value;
        }}
      />
      <button
        type="submit"
        className="w-1/5 bg-lime-700 p-3 rounded text-white font-extrabold"
      >
        Search
      </button>
    </form>
  );
}
export default SearchForm;
