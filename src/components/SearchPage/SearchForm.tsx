import { useState, useRef } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import { updateQueryParams } from '../../utils/helpFunctions';

interface Props {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setPaginationButtonsValue: React.Dispatch<React.SetStateAction<number[]>>;
  params: URLSearchParams;
  setParams: SetURLSearchParams;
}

function SearchForm(props: Props) {
  const {
    searchValue,
    setSearchValue,
    pageNumber,
    setPageNumber,
    setPaginationButtonsValue,
    params,
    setParams,
  } = props;
  const inputCurrentValue = useRef(searchValue);
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
        setSearchValue(inputCurrentValue.current);
        setPaginationButtonsValue([1, 2, 3]);
        setParams(updateQueryParams(params, 'search', ''));
        if (pageNumber) setPageNumber(0);
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
