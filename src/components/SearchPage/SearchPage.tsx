import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import Loader from '../Loader';
import ErrorBoundary from '../ErrorBoundary';
import { apiResponse } from '../../utils/types';
import { Animal } from '../../utils/types';
import SelectLimit from './Select';

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
  console.log(pageNumber);
  console.log(paginationButtonsValue);

  const navigate = useNavigate();

  const [searchResultsArray, setSearchResultsArray] = useState<
    Readonly<Animal[]>
  >([]);
  const [errorOccured, setErrorOccured] = useState(false);

  useEffect(() => {
    console.log('юз');

    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize]);

  function changeSearchValue(newValue: string) {
    setSearchValue(newValue);
  }

  useEffect(() => {
    navigate('?' + params, { replace: true });
  }, [navigate, params]);

  async function search() {
    console.log(pageNumber);
    console.log(pageSize);
    console.log(params);

    setLoading(true);
    localStorage.setItem('searchValue', searchValue);
    const url = `https://stapi.co/api/v1/rest/animal/search?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    try {
      const response = searchValue
        ? await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `${encodeURIComponent('name')}=${encodeURIComponent(
              searchValue
            )}`,
          })
        : await fetch(url, {
            method: 'GET',
          });

      const json: apiResponse = await response.json();
      setTotalPages(json.page.totalPages);
      setLoading(false);
      setSearchResultsArray(json.animals);
    } catch {
      setErrorOccured(true);
    }
  }

  if (errorOccured) {
    throw new Error("Hello, I'm Error with server!");
  }
  return (
    <ErrorBoundary>
      <main className="min-h-screen flex flex-col">
        <section className="bg-lime-200 py-10">
          <SearchForm
            searchValue={searchValue}
            changeSearchValue={changeSearchValue}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            setPaginationButtonsValue={setPaginationButtonsValue}
            search={search}
            params={params}
            setParams={setParams}
          />
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
              <SearchResults searchResultsArray={searchResultsArray} />
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
      </main>
      {loading && <Loader />}
    </ErrorBoundary>
  );
}

export default SearchPage;
