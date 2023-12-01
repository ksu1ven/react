import { MutableRefObject, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';

interface Props {
  inputRef: MutableRefObject<HTMLInputElement | null>;
  countriesFilteredVisible: boolean;
  setCountriesFilteredVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputCountry(props: Props) {
  const { inputRef, countriesFilteredVisible, setCountriesFilteredVisible } =
    props;

  const counriesAll = useSelector(
    (state: RootState) => state.countries.countries
  );
  const errorCountry = useSelector((state: RootState) => state.error.country);

  const [countriesFiltered, setCountriesFiltered] = useState<string[]>([]);

  const handleChange = () => {
    setCountriesFilteredVisible(true);
    setCountriesFiltered(
      counriesAll.filter((country) =>
        country
          .toLowerCase()
          .startsWith(inputRef.current?.value?.toLowerCase() || '')
      )
    );
  };

  return (
    <fieldset>
      <label htmlFor="country">Country:</label>
      <input
        type="text"
        id="country"
        className="bg-red-600"
        autoFocus
        ref={inputRef}
        onChange={handleChange}
        onFocus={() => setCountriesFilteredVisible(true)}
      />
      {countriesFilteredVisible &&
        countriesFiltered.map((country) => (
          <label
            htmlFor="country"
            key={country}
            className="flex flex-col cursor-pointer"
            onClick={() => {
              if (inputRef.current) inputRef.current.value = country;
              setCountriesFiltered([]);
            }}
          >
            {country}
          </label>
        ))}
      <p>{errorCountry ? errorCountry : ''}</p>
    </fieldset>
  );
}
