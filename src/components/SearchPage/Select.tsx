import { SetURLSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPageSize } from '../../redux/features/limitSlice';
import { setFirstPage } from '../../redux/features/paginationSlice';
import type { RootState } from '../../redux/store/store';
import { updateQueryParams } from '../../utils/helpFunctions';

interface Props {
  params: URLSearchParams;
  setParams: SetURLSearchParams;
}

function SelectLimit(props: Props) {
  const pageSize = useSelector((state: RootState) => state.limit.pageSize);
  const optionValues = [5, 10, 20, 50, 100];

  const dispatch = useDispatch();

  const { params, setParams } = props;

  return (
    <label className="flex justify-end mr-32 font-extrabold text-xl">
      Limit per page:
      <select
        className="bg-lime-700 text-white"
        name="itemsPerPage"
        id="itemsPerPage"
        data-testid="select"
        value={pageSize}
        onChange={(e) => {
          dispatch(setPageSize(+e.target.value));
          dispatch(setFirstPage());
          setParams(updateQueryParams(params, 'limit', e.target.value));
        }}
      >
        {optionValues.map((el) => (
          <option value={el} key={el} data-testid="select-option">
            {el}
          </option>
        ))}
      </select>
    </label>
  );
}
export default SelectLimit;
