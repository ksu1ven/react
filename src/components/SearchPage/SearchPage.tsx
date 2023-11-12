import { useEffect, useState } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import Loader from '../Loader';
import ErrorBoundary from '../ErrorBoundary';
import { Animal, apiResponse } from '../../utils/types';
import { searchCards } from '../../utils/api';
import { updateQueryParams } from '../../utils/helpFunctions';
import SelectLimit from './Select';
import { SearchValueContext, SearchResultsContext } from './Contexts';

function SearchPage() {
  const [params, setParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') || ''
  );
  const [pageNumber, setPageNumber] = useState(
    params.get('page') ? Number(params.get('page')) - 1 : 0
  );
  const [pageSize, setPageSize] = useState(Number(params.get('limit')) || 10);
  const [totalPages, setTotalPages] = useState(0);
  const [paginationButtonsValue, setPaginationButtonsValue] = useState(
    pageNumber > 2
      ? [1, 2, 3].map((el, ind) => pageNumber + ind - 1 + el - el)
      : [1, 2, 3]
  );
  const [searchResultsArray, setSearchResultsArray] = useState<
    Readonly<Animal[]>
  >([]);
  const [errorOccured, setErrorOccured] = useState(false);

  useEffect(() => {
    setLoading(true);
    searchCards(searchValue, pageNumber, pageSize)
      .then((json: apiResponse) => {
        setTotalPages(json.page.totalPages);
        setLoading(false);
        setSearchResultsArray(json.animals);
      })
      .catch(() => setErrorOccured(true));
  }, [searchValue, pageNumber, pageSize]);

  if (errorOccured) {
    throw new Error("Hello, I'm Error with server!");
  }
  return (
    <ErrorBoundary>
      <main className="relative min-h-screen flex flex-col grow">
        <section className="bg-lime-200 py-10">
          <SearchValueContext.Provider value={searchValue}>
            <SearchForm
              setSearchValue={setSearchValue}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              setPaginationButtonsValue={setPaginationButtonsValue}
              params={params}
              setParams={setParams}
            />
          </SearchValueContext.Provider>
        </section>
        <section className="search-results grow">
          <SelectLimit
            pageSize={pageSize}
            setPageNumber={setPageNumber}
            setPageSize={setPageSize}
            setPaginationButtonsValue={setPaginationButtonsValue}
            params={params}
            setParams={setParams}
          />
          {!loading && (
            <>
              <SearchResultsContext.Provider value={searchResultsArray}>
                <SearchResults params={params} setParams={setParams} />
              </SearchResultsContext.Provider>

              {totalPages && (
                <Pagination
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  totalPages={totalPages}
                  paginationButtonsValue={paginationButtonsValue}
                  setPaginationButtonsValue={setPaginationButtonsValue}
                  params={params}
                  setParams={setParams}
                />
              )}
            </>
          )}
        </section>
        {loading && <Loader />}
      </main>
      {params.has('details') && (
        <div
          className="fixed w-screen h-full bg-slate-500/70"
          onClick={() => {
            if (params.has('details'))
              setParams(updateQueryParams(params, 'details', ''));
          }}
        ></div>
      )}
      <Outlet />
    </ErrorBoundary>
  );
}

export default SearchPage;
