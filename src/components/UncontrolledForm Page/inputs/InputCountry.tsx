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
      <div className="flex flex-col w-min items-end">
        <input
          type="text"
          id="country"
          ref={inputRef}
          onChange={handleChange}
        />
        {countriesFilteredVisible &&
          countriesFiltered.map((country) => (
            <label
              htmlFor="country"
              key={country}
              className="w-full cursor-pointer bg-cyan-200 p-2 border-solid border-t border-cyan-800 text-cyan-800"
              onClick={() => {
                if (inputRef.current) inputRef.current.value = country;
                setCountriesFiltered([]);
              }}
            >
              {country}
            </label>
          ))}
        <p className="self-start">{errorCountry ? errorCountry : ''}</p>
      </div>
    </fieldset>
  );
}
