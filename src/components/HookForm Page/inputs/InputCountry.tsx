import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { Register, SetValue, SetError } from '../../../utils/types';

interface Props {
  countriesFilteredVisible: boolean;
  setCountriesFilteredVisible: React.Dispatch<React.SetStateAction<boolean>>;
  register: Register;
  watchCountry: string | undefined;
  setValue: SetValue;
  error: string | undefined;
  setError: SetError;
}

export default function InputCountry(props: Props) {
  const {
    register,
    watchCountry,
    setValue,
    error,
    setError,
    countriesFilteredVisible,
    setCountriesFilteredVisible,
  } = props;

  const counriesAll = useSelector(
    (state: RootState) => state.countries.countries
  );

  const countryRegister = register('country');
  const [countriesFiltered, setCountriesFiltered] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountriesFilteredVisible(true);
    setCountriesFiltered(
      counriesAll.filter((country) =>
        country.toLowerCase().startsWith(e.target.value?.toLowerCase() || '')
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
        {...countryRegister}
        onChange={(e) => {
          countryRegister.onChange(e);
          handleChange(e);
        }}
        onFocus={() => setCountriesFilteredVisible(true)}
      />
      {countriesFilteredVisible &&
        watchCountry &&
        countriesFiltered.map((country) => (
          <label
            htmlFor="country"
            key={country}
            className="flex flex-col"
            onClick={() => {
              setValue('country', country);
              setError('country', { type: 'no-error', message: '' });
              setCountriesFiltered([]);
            }}
          >
            {country}
          </label>
        ))}
      <p>{error ? error : ''}</p>
    </fieldset>
  );
}
