import { Component } from 'react';
import { Animal } from '../../utils/types';
import pawImg from '../../assets/paw.png';

interface Props {
  searchResultsArray: Readonly<Animal[]>;
}

class SearchResults extends Component<
  Props,
  Record<string, never>,
  Record<string, never>
> {
  checkDescription(animal: Animal) {
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
  render() {
    return (
      <div className="w-1/3 m-auto py-20 flex flex-col gap-5 ">
        {this.props.searchResultsArray.length ? (
          this.props.searchResultsArray.map((el) => {
            const animalDescription = this.checkDescription(el);
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
}

export default SearchResults;
