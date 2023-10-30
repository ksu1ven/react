interface Props {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

function Pagination(props: Props) {
  const { pageNumber, setPageNumber, totalPages } = props;

  return (
    <div className="flex justify-center gap-4 mb-10">
      <button className="w-14 h-14 text-lime-700 text-4xl p-3 rounded-full text-white font-extrabold">
        {'<'}
      </button>
      <button
        className={
          pageNumber === 0
            ? 'w-14 h-14 bg-lime-300 p-3 rounded-full text-white font-extrabold'
            : 'w-14 h-14 bg-lime-700 p-3 rounded-full text-white font-extrabold'
        }
        onClick={() => {
          setPageNumber(pageNumber > 3 ? pageNumber - 2 : 1);
        }}
      >
        {pageNumber > 3 ? pageNumber - 3 : 1}
      </button>
      {totalPages > 2 && (
        <button
          className={
            pageNumber === 1
              ? 'w-14 h-14 bg-lime-300 p-3 rounded-full text-white font-extrabold'
              : 'w-14 h-14 bg-lime-700 p-3 rounded-full text-white font-extrabold'
          }
          onClick={() => {}}
        >
          {pageNumber > 3 ? pageNumber - 2 : 2}
        </button>
      )}
      {totalPages > 3 && (
        <button
          className={
            pageNumber === 2
              ? 'w-14 h-14 bg-lime-300 p-3 rounded-full text-white font-extrabold'
              : 'w-14 h-14 bg-lime-700 p-3 rounded-full text-white font-extrabold'
          }
          onClick={() => {
            setPageNumber(pageNumber > 2 ? pageNumber : 3);
          }}
        >
          {pageNumber > 3 ? pageNumber - 1 : 3}
        </button>
      )}
      {totalPages > 3 && (
        <button
          className="w-14 h-14 text-lime-700 text-4xl p-3 rounded-full text-white font-extrabold"
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        >
          ...
        </button>
      )}
      <button className="w-14 h-14 bg-lime-700 p-3 rounded-full text-white font-extrabold">
        {totalPages}
      </button>
      <button className="w-14 h-14 text-lime-700 text-4xl p-3 rounded-full text-white font-extrabold">
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
