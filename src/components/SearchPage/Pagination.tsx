import { SetURLSearchParams } from 'react-router-dom';
import { updateQueryParams } from '../../utils/helpFunctions';

interface Props {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  paginationButtonsValue: number[];
  setPaginationButtonsValue: React.Dispatch<React.SetStateAction<number[]>>;
  params: URLSearchParams;
  setParams: SetURLSearchParams;
}

function Pagination(props: Props) {
  const {
    pageNumber,
    setPageNumber,
    totalPages,
    paginationButtonsValue,
    setPaginationButtonsValue,
    params,
    setParams,
  } = props;

  function changePaginationButtonsValue() {
    if (
      totalPages - paginationButtonsValue[paginationButtonsValue.length - 1] <=
      1
    ) {
      return;
    }
    const increaseNumber =
      totalPages - paginationButtonsValue[paginationButtonsValue.length - 1] <
      paginationButtonsValue.length
        ? 1
        : paginationButtonsValue.length;

    setPaginationButtonsValue(
      paginationButtonsValue.map((el) => el + increaseNumber)
    );
    const newPageNumber =
      paginationButtonsValue[paginationButtonsValue.length - 1] +
      increaseNumber;
    setParams(updateQueryParams(params, 'page', newPageNumber.toString()));
    setPageNumber(newPageNumber - 1);
  }

  function clickNextPrevButton(direction: 'next' | 'prev') {
    const increaseDecreaseNumber = direction == 'next' ? 1 : -1;
    const newPageNumber = pageNumber + increaseDecreaseNumber;
    if (newPageNumber < 0 || newPageNumber > totalPages - 1) return;

    if (paginationButtonsValue.includes(newPageNumber + 1))
      setPageNumber(newPageNumber);
    else {
      const changedArr = paginationButtonsValue.map(
        (el) => el + increaseDecreaseNumber
      );
      setPaginationButtonsValue(changedArr);
      const newPageNumber =
        direction == 'next' ? changedArr[changedArr.length - 1] : changedArr[0];
      setParams(updateQueryParams(params, 'page', newPageNumber.toString()));
      setPageNumber(newPageNumber - 1);
    }
  }

  function clickLastPage() {
    if (totalPages > paginationButtonsValue.length)
      setPaginationButtonsValue(
        paginationButtonsValue.map(
          (el, ind) =>
            totalPages - paginationButtonsValue.length + ind + el - el
        )
      );
    setParams(updateQueryParams(params, 'page', totalPages.toString()));
    setPageNumber(totalPages - 1);
  }

  return (
    <div className="flex justify-center gap-4 mb-10">
      <button
        className="w-14 h-14 text-lime-700 text-4xl p-3 rounded-full text-white font-extrabold"
        onClick={() => clickNextPrevButton('prev')}
      >
        {'<'}
      </button>
      {paginationButtonsValue.map((value) => {
        return (
          totalPages > value && (
            <button
              key={`button-${value}`}
              className={
                pageNumber + 1 === value
                  ? 'w-14 h-14 bg-lime-300 p-3 rounded-full text-white font-extrabold'
                  : 'w-14 h-14 bg-lime-700 p-3 rounded-full text-white font-extrabold'
              }
              onClick={() => {
                setParams(updateQueryParams(params, 'page', value.toString()));
                setPageNumber(value - 1);
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
        onClick={() => {
          clickLastPage();
        }}
      >
        {totalPages}
      </button>
      <button
        className="w-14 h-14 text-lime-700 text-4xl p-3 rounded-full text-white font-extrabold"
        onClick={() => clickNextPrevButton('next')}
      >
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
