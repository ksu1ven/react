import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import Loader from '../Loader';
import { apiResponse } from '../../utils/types';
import { useEffect, useState } from 'react';
import { Animal } from '../../utils/types';

function SearchPage() {
  const pageSize = 10;

  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') || ''
  );
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchResultsArray, setSearchResultsArray] = useState<
    Readonly<Animal[]>
  >([]);
  const [errorOccured, setErrorOccured] = useState(false);

  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeSearchValue(newValue: string) {
    setSearchValue(newValue);
  }

  async function search() {
    console.log('search');
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
      console.log(response);
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
            search={search}
          />
        </section>
        <section className="search-results grow">
          {!loading && (
            <>
              <SearchResults searchResultsArray={searchResultsArray} />
              <Pagination
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalPages={totalPages}
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
