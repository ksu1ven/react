import { useEffect } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store/store';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import Loader from '../Loader';
import { updateQueryParams } from '../../utils/helpFunctions';
import SelectLimit from './Select';
import { useSearchByValueMutation } from '../../redux/api/searchCards';
import { setTotalPage } from '../../redux/features/paginationSlice';
import { setSearchResults } from '../../redux/features/resultsSlice';
import { setLoadingStatus } from '../../redux/features/loaderSlice';

function SearchPage() {
  const [params, setParams] = useSearchParams();
  const { totalPages, pageNumber } = useSelector(
    (state: RootState) => state.pagination
  );
  const pageSize = useSelector((state: RootState) => state.limit.pageSize);
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const searchResults = useSelector(
    (state: RootState) => state.results.searchResults
  );
  const searchLoader = useSelector(
    (state: RootState) => state.loader.searchLoader
  );

  const dispatch = useDispatch();

  const [getAnimals, { data, isLoading, isSuccess }] =
    useSearchByValueMutation();

  useEffect(() => {
    console.log('isLoad');
    if (isLoading) {
      dispatch(setLoadingStatus({ loader: 'search', value: true }));
    }
    if (isSuccess) {
      dispatch(setSearchResults(data?.animals));
      dispatch(setTotalPage(data?.page.totalPages));
      dispatch(setLoadingStatus({ loader: 'search', value: false }));
    }
  }, [isLoading, isSuccess]);

  useEffect(() => {
    console.log('юз');
    //my API supports only post requests  to get animal by name, so for search without value
    //I also use post request (more simple, when only one type of requests)
    async function getData() {
      await getAnimals({ pageNumber, pageSize, searchValue });
    }

    getData();
  }, [pageNumber, pageSize, searchValue, getAnimals]);

  return (
    <>
      <main className="relative min-h-screen flex flex-col grow">
        <section className="bg-lime-200 py-10">
          <SearchForm params={params} setParams={setParams} />
        </section>
        <section className="search-results grow">
          <SelectLimit params={params} setParams={setParams} />
          {!searchLoader && (
            <>
              {data && (
                <SearchResults
                  params={params}
                  setParams={setParams}
                  searchResults={searchResults}
                />
              )}

              {totalPages && (
                <Pagination params={params} setParams={setParams} />
              )}
            </>
          )}
        </section>
        {searchLoader && <Loader />}
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
    </>
  );
}

export default SearchPage;
