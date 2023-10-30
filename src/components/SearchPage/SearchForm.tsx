import { useState } from 'react';

interface Props {
  searchValue: string;
  changeSearchValue: (newValue: string) => void;
  search: () => void;
}

function SearchForm(props: Props) {
  const [errorOccured, setErrorOccured] = useState(false);

  if (errorOccured) {
    throw new Error("Hello, I'm Error!");
  }
  return (
    <form
      action="#"
      className="w-3/5 flex justify-center m-auto gap-x-10 rounded"
      onSubmit={(e) => {
        e.preventDefault();
        props.search();
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
        defaultValue={props.searchValue}
        type="text"
        name="search"
        id="search"
        className="w-1/3 p-3"
        onChange={(e) => {
          e.target.value = e.target.value.trim();
          props.changeSearchValue(e.target.value);
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
