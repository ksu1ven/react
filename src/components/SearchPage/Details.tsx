import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store/store';
import { useSearchByValueMutation } from '../../redux/api/searchCards';
import { setLoadingStatus } from '../../redux/features/loaderSlice';
import {
  setDetailsData,
  setDetailsName,
} from '../../redux/features/detailsSlice';
import { updateQueryParams } from '../../utils/helpFunctions';
import Loader from '../Loader';

function Details() {
  const [params, setParams] = useSearchParams();
  const { detailsName, detailsData } = useSelector(
    (state: RootState) => state.details
  );
  const detailsLoader = useSelector(
    (state: RootState) => state.loader.detailsLoader
  );
  const dispatch = useDispatch();
  const [getDetails, { data, isLoading, isSuccess }] =
    useSearchByValueMutation();

  useEffect(() => {
    if (detailsName && isLoading) {
      dispatch(setLoadingStatus({ loader: 'details', value: true }));
    }
    if (detailsName && isSuccess) {
      dispatch(setDetailsData(data?.animals[0]));
      dispatch(setLoadingStatus({ loader: 'details', value: false }));
    }
  }, [isLoading, isSuccess, detailsName, dispatch, data?.animals]);

  useEffect(() => {
    async function getData() {
      await getDetails({
        pageNumber: 0,
        pageSize: 1000,
        searchValue: detailsName,
      });
    }
    if (detailsName) getData();
  }, [detailsName, getDetails]);

  return params.has('details') ? (
    <aside
      className="relative w-1/3 bg-lime-700 text-white flex flex-col pt-40 items-center gap-6"
      data-testid="details"
    >
      <button
        className="absolute top-14 right-14 flex items-center justify-center w-16 h-16 bg-lime-300 text-4xl p-3 rounded-full"
        data-testid="cross"
        onClick={() => {
          dispatch(setDetailsName(''));
          setParams(updateQueryParams(params, 'details', ''));
        }}
      >
        X
      </button>
      {detailsLoader ? (
        <Loader data-testid="loader-details" />
      ) : (
        <div>
          <h1
            className="text-5xl font-extrabold text-lime-300 mb-10"
            data-testid="details-h1"
          >
            {detailsData.name}
          </h1>
          <ul className="text-3xl font-extrabold">
            <li>Avian: {detailsData.avian ? 'Yes' : 'No'}</li>
            <li>Canine: {detailsData.canine ? 'Yes' : 'No'}</li>
            <li>EarthAnimal: {detailsData.earthAnimal ? 'Yes' : 'No'}</li>
            <li>EarthInsect: {detailsData.earthInsect ? 'Yes' : 'No'}</li>
            <li>Feline: {detailsData.feline ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      )}
    </aside>
  ) : (
    <></>
  );
}

export default Details;
