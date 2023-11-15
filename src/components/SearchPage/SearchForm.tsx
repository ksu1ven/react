import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store/store';
import { SetURLSearchParams } from 'react-router-dom';
import { setSearchValue } from '../../redux/features/searchSlice';
import {
  setPageNumber,
  setPaginationButtonsValue,
} from '../../redux/features/paginationSlice';
import { updateQueryParams } from '../../utils/helpFunctions';

interface Props {
  params: URLSearchParams;
  setParams: SetURLSearchParams;
}

function SearchForm(props: Props) {
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const pageNumber = useSelector(
    (state: RootState) => state.pagination.pageNumber
  );
  const dispatch = useDispatch();
  const inputCurrentValue = useRef(searchValue);

  const { params, setParams } = props;

  const [errorOccured, setErrorOccured] = useState(false);

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
        localStorage.setItem('searchValue', inputCurrentValue.current);
        dispatch(setSearchValue(inputCurrentValue.current));
        dispatch(setPaginationButtonsValue([1, 2, 3]));
        setParams(updateQueryParams(params, 'search', ''));
        if (pageNumber) dispatch(setPageNumber(0));
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
