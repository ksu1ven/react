import { SetURLSearchParams } from 'react-router-dom';
import { updateQueryParams } from '../../utils/helpFunctions';

interface Props {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setPaginationButtonsValue: React.Dispatch<React.SetStateAction<number[]>>;
  params: URLSearchParams;
  setParams: SetURLSearchParams;
}

function SelectLimit(props: Props) {
  const {
    pageSize,
    setPageNumber,
    setPageSize,
    setPaginationButtonsValue,
    params,
    setParams,
  } = props;

  return (
    <label className="flex justify-end mr-32 font-extrabold text-xl">
      Limit per page:
      <select
        className="bg-lime-700 text-white"
        name="itemsPerPage"
        id="itemsPerPage"
        defaultValue={pageSize}
        onChange={(e) => {
          setParams(updateQueryParams(params, 'limit', e.target.value));
          setPageSize(+e.target.value);
          setPageNumber(0);
          setPaginationButtonsValue([1, 2, 3]);
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </label>
  );
}
export default SelectLimit;
