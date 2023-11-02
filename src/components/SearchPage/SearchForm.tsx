import { useState } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import { updateQueryParams } from '../../utils/helpFunctions';

interface Props {
  searchValue: string;
  changeSearchValue: (newValue: string) => void;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setPaginationButtonsValue: React.Dispatch<React.SetStateAction<number[]>>;
  search: () => void;
  params: URLSearchParams;
  setParams: SetURLSearchParams;
}

function SearchForm(props: Props) {
  const {
    searchValue,
    changeSearchValue,
    pageNumber,
    setPageNumber,
    setPaginationButtonsValue,
    search,
    params,
    setParams,
  } = props;
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
        setPaginationButtonsValue([1, 2, 3]);
        setParams(updateQueryParams(params, 'search', ''));
        if (pageNumber) setPageNumber(0);
        else search();
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
          changeSearchValue(e.target.value);
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
