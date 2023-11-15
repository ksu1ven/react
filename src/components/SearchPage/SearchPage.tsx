import { useSearchParams, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store/store';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import Loader from '../Loader';
import { updateQueryParams } from '../../utils/helpFunctions';
import SelectLimit from './Select';
import { useSearchCardsQuery } from '../../redux/api/searchCards';
import { setTotalPage } from '../../redux/features/paginationSlice';

function SearchPage() {
  const pageNumber = useSelector(
    (state: RootState) => state.pagination.pageNumber
  );
  const pageSize = useSelector((state: RootState) => state.limit.pageSize);
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const {
    data = [],
    isLoading,
    isFetching,
  } = useSearchCardsQuery({ pageNumber, pageSize });

  if (data && data?.page?.totalPages) {
    dispatch(setTotalPage(data?.page?.totalPages));
  }
  if (isLoading) {
    console.log('isLoading');
  }
  if (isFetching) {
    console.log('isFetching');
  }

  return (
    <>
      <main className="relative min-h-screen flex flex-col grow">
        <section className="bg-lime-200 py-10">
          <SearchForm params={params} setParams={setParams} />
        </section>
        <section className="search-results grow">
          <SelectLimit params={params} setParams={setParams} />
          {!isLoading && !isFetching && (
            <>
              <SearchResults
                params={params}
                setParams={setParams}
                data={data.animals}
              />

              {data?.page?.totalPages && (
                <Pagination params={params} setParams={setParams} />
              )}
            </>
          )}
        </section>
        {(isLoading || isFetching) && <Loader />}
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
