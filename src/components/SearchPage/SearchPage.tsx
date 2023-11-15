import { useState } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store/store';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import Loader from '../Loader';
import ErrorBoundary from '../ErrorBoundary';
import { Animal } from '../../utils/types';
import { updateQueryParams } from '../../utils/helpFunctions';
import SelectLimit from './Select';
import { SearchResultsContext } from './Contexts';

function SearchPage() {
  const [loading] = useState(false);
  const { totalPages } = useSelector((state: RootState) => state.pagination);

  const [params, setParams] = useSearchParams();

  const [searchResultsArray] = useState<Readonly<Animal[]>>([]);

  const [errorOccured] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   searchCards(searchValue, pageNumber, pageSize)
  //     .then((json: apiResponse) => {
  //       setTotalPages(json.page.totalPages);
  //       setLoading(false);
  //       setSearchResultsArray(json.animals);
  //     })
  //     .catch(() => setErrorOccured(true));
  // }, [searchValue, pageNumber, pageSize]);

  if (errorOccured) {
    throw new Error("Hello, I'm Error with server!");
  }
  return (
    <ErrorBoundary>
      <main className="relative min-h-screen flex flex-col grow">
        <section className="bg-lime-200 py-10">
          <SearchForm params={params} setParams={setParams} />
        </section>
        <section className="search-results grow">
          <SelectLimit params={params} setParams={setParams} />
          {!loading && (
            <>
              <SearchResultsContext.Provider value={searchResultsArray}>
                <SearchResults params={params} setParams={setParams} />
              </SearchResultsContext.Provider>

              {totalPages && (
                <Pagination params={params} setParams={setParams} />
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
