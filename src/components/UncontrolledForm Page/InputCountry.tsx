import { MutableRefObject, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

export default function InputCountry(
  props: Record<'inputRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { inputRef } = props;

  const counriesAll = useSelector(
    (state: RootState) => state.countries.countries
  );
  const errorCountry = useSelector((state: RootState) => state.error.country);

  const [countriesFiltered, setCountriesFiltered] = useState<string[]>([]);
  const [countriesFilteredVisible, setCountriesFilteredVisible] =
    useState(false);

  const handleChange = () => {
    setCountriesFiltered(
      counriesAll.filter((country) =>
        country
          .toLowerCase()
          .startsWith(inputRef.current?.value?.toLowerCase() || '')
      )
    );
  };

  return (
    <fieldset
      onMouseEnter={() => {
        setCountriesFilteredVisible(true);
      }}
      onMouseLeave={() => {
        setCountriesFilteredVisible(false);
      }}
    >
      <label htmlFor="country">Country:</label>
      <input
        type="text"
        id="country"
        className="bg-red-600"
        autoFocus
        ref={inputRef}
        onChange={handleChange}
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
