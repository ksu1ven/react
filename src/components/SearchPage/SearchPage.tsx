import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import Loader from '../Loader';
import { apiResponse } from '../../utils/types';
import { useEffect, useState } from 'react';
import { Animal } from '../../utils/types';
import SelectLimit from './Select';

function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') || ''
  );

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [paginationButtonsValue, setPaginationButtonsValue] = useState([
    1, 2, 3,
  ]);

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

  async function search() {
    console.log(pageNumber);
    console.log(pageSize);

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
    <>
      <main className="min-h-screen flex flex-col">
        <section className="bg-lime-200 py-10">
          <SearchForm
            searchValue={searchValue}
            changeSearchValue={changeSearchValue}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            setPaginationButtonsValue={setPaginationButtonsValue}
            search={search}
          />
        </section>
        <section className="search-results grow">
          {!loading && (
            <>
              <SelectLimit
                pageSize={pageSize}
                setPageNumber={setPageNumber}
                setPageSize={setPageSize}
                setPaginationButtonsValue={setPaginationButtonsValue}
              />

              <SearchResults searchResultsArray={searchResultsArray} />
              <Pagination
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalPages={totalPages}
                paginationButtonsValue={paginationButtonsValue}
                setPaginationButtonsValue={setPaginationButtonsValue}
              />
            </>
          )}
        </section>
      </main>
      {loading && <Loader />}
    </>
  );
}

export default SearchPage;
