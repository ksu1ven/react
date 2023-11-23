import { RootState, wrapper } from "../redux/store/store";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Pagination from "../components/Pagination";
import SelectLimit from "../components/Select";
import Details from "@/components/Details";
import Error from "./_error";
import {
  getRunningQueriesThunk,
  searchByValue,
} from "../redux/api/searchCards";
import { apiResponse } from "@/utils/types";
import { useRouter } from "next/router";
import { updateQueryParams } from "@/utils/helpFunctions";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const pageNumber = Number(context.query.page) - 1 || 0;
    const pageSize = Number(context.query.limit) || 10;
    const searchValue = context.query.search?.toString() || "";
    const details = context.query.details?.toString() || "";
    const response = await store.dispatch(
      searchByValue.initiate({
        pageNumber,
        pageSize,
        searchValue,
      })
    );
    const detailsResponse = details
      ? await store.dispatch(
          searchByValue.initiate({
            pageNumber: 0,
            pageSize: 1,
            searchValue: details,
          })
        )
      : null;

    const paginationButtonsValue =
      pageNumber && pageNumber > 2
        ? [1, 2, 3].map((_, ind) => pageNumber + ind - 1)
        : [1, 2, 3];
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { response, searchValue, detailsResponse, paginationButtonsValue },
    };
  }
);

interface Props {
  response: apiResponse;
  detailsResponse: apiResponse | null;
  searchValue: string;
  paginationButtonsValue: number[];
}

export default function SearchPage({
  response,
  searchValue,
  detailsResponse,
  paginationButtonsValue,
}: Props) {
  const router = useRouter();
  if (response.error) {
    return <Error />;
  }

  const { pageNumber, totalPages, pageSize } = response.data.page;
  const searchResults = response.data.animals;
  const detailsData = detailsResponse?.data.animals[0];

  return (
    <main className="flex">
      <section className="relative min-h-screen flex flex-col grow">
        <section className="bg-lime-200 py-10">
          <SearchForm searchValue={searchValue} />
        </section>
        <section className="search-results grow">
          <SelectLimit pageSize={pageSize} />
          <SearchResults searchResults={searchResults} />
          {totalPages && (
            <Pagination
              pageNumber={pageNumber}
              totalPages={totalPages}
              paginationButtonsValue={paginationButtonsValue}
            />
          )}
        </section>
      </section>

      {router.query.details && detailsData && (
        <>
          <div
            className="fixed w-screen h-full bg-slate-500/70"
            onClick={() => {
              const newParams = updateQueryParams(router.query, "details", "");
              router.push(newParams.toString() ? "?" + newParams : "");
            }}
          ></div>
          <Details detailsData={detailsData} />
        </>
      )}
    </main>
  );
}
