import { Animal } from '../../utils/types';
import pawImg from '../../assets/paw.png';

interface Props {
  searchResultsArray: Readonly<Animal[]>;
}

function SearchResults(props: Props) {
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

  return (
    <div className="w-1/3 m-auto mt-20 mb-10 flex flex-col gap-5 ">
      {props.searchResultsArray.length ? (
        props.searchResultsArray.map((el) => {
          const animalDescription = checkDescription(el);
          return (
            <div key={el.uid} className="flex justify-between gap-5">
              <img src={pawImg} alt="animal picture" className="w-16 h-16" />
              <div className="grow">
                <h2 className="font-extrabold mb-1">{el.name}</h2>
                <p>Description: {animalDescription}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-3xl">Nothing found:(</p>
      )}
    </div>
  );
}

export default SearchResults;
