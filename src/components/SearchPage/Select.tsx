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
  const optionValues = [5, 10, 20, 50, 100];

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
        {optionValues.map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>
    </label>
  );
}
export default SelectLimit;
