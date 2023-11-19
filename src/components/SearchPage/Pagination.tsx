import { SetURLSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store/store';
import {
  clickNextPrevButton,
  clickLastPage,
  setPageNumber,
  setPaginationButtonsValue,
} from '../../redux/features/paginationSlice';
import { updateQueryParams } from '../../utils/helpFunctions';

interface Props {
  params: URLSearchParams;
  setParams: SetURLSearchParams;
}

function Pagination(props: Props) {
  const { pageNumber, totalPages, paginationButtonsValue } = useSelector(
    (state: RootState) => state.pagination
  );

  const dispatch = useDispatch();

  const { params, setParams } = props;

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
    const newButtonsValue = paginationButtonsValue.map(
      (el) => el + increaseNumber
    );
    dispatch(setPaginationButtonsValue(newButtonsValue));
    const newPageNumber =
      paginationButtonsValue[paginationButtonsValue.length - 1] +
      increaseNumber;
    dispatch(setPageNumber(newPageNumber - 1));
    setParams(updateQueryParams(params, 'page', newPageNumber.toString()));
  }

  return (
    <div className="flex justify-center gap-4 mb-10" data-testid="pagination">
      <button
        className="w-14 h-14 text-lime-700 text-4xl p-3 rounded-full text-white font-extrabold"
        onClick={() => {
          if (pageNumber <= 0) return;
          dispatch(clickNextPrevButton('prev'));
          setParams(updateQueryParams(params, 'page', pageNumber.toString()));
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
                dispatch(setPageNumber(value - 1));
                setParams(updateQueryParams(params, 'page', value.toString()));
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
          dispatch(clickLastPage());
          setParams(updateQueryParams(params, 'page', totalPages.toString()));
        }}
      >
        {totalPages}
      </button>
      <button
        className="w-14 h-14 text-lime-700 text-4xl p-3 rounded-full text-white font-extrabold"
        onClick={() => {
          if (pageNumber + 1 > totalPages - 1) return;
          dispatch(clickNextPrevButton('next'));
          setParams(
            updateQueryParams(params, 'page', (pageNumber + 2).toString())
          );
        }}
      >
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
