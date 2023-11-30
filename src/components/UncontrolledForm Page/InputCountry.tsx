import { MutableRefObject, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

export default function InputCountry(
  props: Record<'inputRef', MutableRefObject<HTMLInputElement | null>>
) {
  const { inputRef } = props;

  const counriesAll = useSelector(
    (state: RootState) => state.countries.countries
  );

  const countySelected = useRef('');
  const [countriesFiltered, setCountriesFiltered] = useState<string[]>([]);

  const handleChange = () => {
    setCountriesFiltered(
      counriesAll.filter((country) =>
        country
          .toLowerCase()
          .startsWith(inputRef.current?.value?.toLowerCase() || '')
      )
    );
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setCountriesFiltered([]);
    if (countriesFiltered[0].toLowerCase() === e.target.value.toLowerCase()) {
      e.target.value = countriesFiltered[0];
    } else e.target.value = '';
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
        onClick={(e) => {
          (e.target as HTMLInputElement).value = countySelected.current;
          setCountriesFiltered([]);
        }}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />
      {inputRef.current?.value &&
        countriesFiltered.map((country) => (
          <label
            htmlFor="country"
            key={country}
            className="flex flex-col"
            onClick={() => {
              countySelected.current = country;
            }}
          >
            {country}
          </label>
        ))}
    </fieldset>
  );
}
