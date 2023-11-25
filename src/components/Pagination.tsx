import React from 'react';
import { useRouter } from 'next/router';
import { updateQueryParams } from '../utils/helpFunctions';

interface Props {
  pageNumber: number;
  totalPages: number;
  paginationButtonsValue: number[];
}

function Pagination(props: Props) {
  const { pageNumber, totalPages, paginationButtonsValue } = props;

  const router = useRouter();

  function changePaginationButtonsValue() {
    if (
      totalPages - paginationButtonsValue[paginationButtonsValue.length - 1] <=
      1
    )
      return;
    const increaseNumber =
      totalPages - paginationButtonsValue[paginationButtonsValue.length - 1] <
      paginationButtonsValue.length
        ? 1
        : paginationButtonsValue.length;
    const newPageNumber =
      paginationButtonsValue[paginationButtonsValue.length - 1] +
      increaseNumber;
    router.push(
      '?' + updateQueryParams(router.query, 'page', newPageNumber.toString())
    );
  }

  return (
    <div className="flex justify-center gap-4 mb-10" data-testid="pagination">
      <button
        className="w-14 h-14 text-lime-700 text-4xl p-3 rounded-full text-white font-extrabold"
        onClick={() => {
          if (pageNumber <= 0) return;
          router.push(
            '?' + updateQueryParams(router.query, 'page', pageNumber.toString())
          );
        }}
      >
        {'<'}
      </button>
      {paginationButtonsValue.map((value, ind) => {
        return (
          totalPages > value && (
            <button
              data-testid={`page-${ind + 1}-button`}
              key={`button-${value}`}
              className={
                pageNumber + 1 === value
                  ? 'w-14 h-14 bg-lime-300 p-3 rounded-full text-white font-extrabold'
                  : 'w-14 h-14 bg-lime-700 p-3 rounded-full text-white font-extrabold'
              }
              onClick={() => {
                router.push(
                  '?' +
                    updateQueryParams(router.query, 'page', value.toString())
                );
              }}
            >
              {value}
            </button>
          )
        );
      })}

      {totalPages > paginationButtonsValue.length && (
        <button
          className="w-14 h-14 text-lime-700 text-4xl p-3 rounded-full text-white font-extrabold"
          onClick={() => {
            changePaginationButtonsValue();
          }}
        >
          ...
        </button>
      )}
      <button
        className={
          pageNumber + 1 === totalPages
            ? 'w-14 h-14 bg-lime-300 p-3 rounded-full text-white font-extrabold'
            : 'w-14 h-14 bg-lime-700 p-3 rounded-full text-white font-extrabold'
        }
        data-testid={'last-page-button'}
        onClick={() => {
          router.push(
            '?' + updateQueryParams(router.query, 'page', totalPages.toString())
          );
        }}
      >
        {totalPages}
      </button>
      <button
        className="w-14 h-14 text-lime-700 text-4xl p-3 rounded-full text-white font-extrabold"
        onClick={() => {
          if (pageNumber + 1 > totalPages - 1) return;
          router.push(
            '?' +
              updateQueryParams(
                router.query,
                'page',
                (pageNumber + 2).toString()
              )
          );
        }}
      >
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
