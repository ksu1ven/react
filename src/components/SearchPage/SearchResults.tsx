import { Animal } from '../../utils/types';
import pawImg from '../../assets/paw.png';
import { useContext, useEffect } from 'react';
import { SetURLSearchParams, useNavigate } from 'react-router-dom';
import { updateQueryParams } from '../../utils/helpFunctions';
import { SearchResultsContext } from './Contexts';

interface Props {
  params: URLSearchParams;
  setParams: SetURLSearchParams;
}

function SearchResults(props: Props) {
  const { params, setParams } = props;
  const searchResultsArray = useContext(SearchResultsContext);
  const navigate = useNavigate();
  function checkDescription(animal: Animal) {
    const descriptionArr: string[] = [];
    Object.entries(animal).forEach((el) => {
      if (el[1] === true) {
        descriptionArr.push(el[0]);
      }
    });
    return descriptionArr.length
      ? descriptionArr.join(', ')
      : "API don't give us description :(";
  }

  useEffect(() => {
    navigate('?' + props.params, { replace: true });
  }, [navigate, props.params]);

  return (
    <div
      className="w-1/3 m-auto mb-10 flex flex-col gap-5 "
      data-testid="search-results"
    >
      {searchResultsArray.length ? (
        searchResultsArray.map((el) => {
          const animalDescription = checkDescription(el);
          return (
            <div
              key={el.uid}
              className="flex justify-between gap-5 cursor-pointer"
              data-testid="card"
              onClick={() => {
                setParams(updateQueryParams(params, 'details', el.name));
              }}
            >
              <img src={pawImg} alt="animal picture" className="w-16 h-16" />
              <div className="grow">
                <h2 className="font-extrabold mb-1">{el.name}</h2>
                <p>Description: {animalDescription}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-3xl" data-testid="no-found">
          Nothing found:(
        </p>
      )}
    </div>
  );
}

export default SearchResults;
