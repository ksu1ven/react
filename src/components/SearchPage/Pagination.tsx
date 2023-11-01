interface Props {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  paginationButtonsValue: number[];
  setPaginationButtonsValue: React.Dispatch<React.SetStateAction<number[]>>;
}

function Pagination(props: Props) {
  const {
    pageNumber,
    setPageNumber,
    totalPages,
    paginationButtonsValue,
    setPaginationButtonsValue,
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
    setPageNumber(
      paginationButtonsValue[paginationButtonsValue.length - 1] +
        increaseNumber -
        1
    );
  }

  function nextPrevButtons(direction: 'next' | 'prev') {
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
      setPageNumber(
        direction == 'next'
          ? changedArr[changedArr.length - 1] - 1
          : changedArr[0] - 1
      );
    }
  }

  return (
    <div className="flex justify-center gap-4 mb-10">
      <button
        className="w-14 h-14 text-lime-700 text-4xl p-3 rounded-full text-white font-extrabold"
        onClick={() => nextPrevButtons('prev')}
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
          setPaginationButtonsValue(
            paginationButtonsValue.map(
              (el, ind) =>
                totalPages - paginationButtonsValue.length + ind + el - el
            )
          );
          setPageNumber(totalPages - 1);
        }}
      >
        {totalPages}
      </button>
      <button
        className="w-14 h-14 text-lime-700 text-4xl p-3 rounded-full text-white font-extrabold"
        onClick={() => nextPrevButtons('next')}
      >
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
