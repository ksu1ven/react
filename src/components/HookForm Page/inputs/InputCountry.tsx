import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { Register, SetValue, Trigger } from '../../../utils/types';

interface Props {
  countriesFilteredVisible: boolean;
  setCountriesFilteredVisible: React.Dispatch<React.SetStateAction<boolean>>;
  register: Register;
  watchCountry: string | undefined;
  setValue: SetValue;
  trigger: Trigger;
  error: string | undefined;
}

export default function InputCountry(props: Props) {
  const {
    register,
    watchCountry,
    setValue,
    error,
    countriesFilteredVisible,
    setCountriesFilteredVisible,
    trigger,
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
      <div className="flex flex-col w-min items-end">
        <input
          type="text"
          id="country"
          {...countryRegister}
          onChange={(e) => {
            countryRegister.onChange(e);
            handleChange(e);
          }}
        />
        {countriesFilteredVisible &&
          watchCountry &&
          countriesFiltered.map((country) => (
            <label
              htmlFor="country"
              key={country}
              className="w-full cursor-pointer bg-pink-200 p-2 border-solid border-t border-pink-800 text-pink-800"
              onClick={() => {
                setValue('country', country);
                setCountriesFiltered([]);
                trigger('country');
              }}
            >
              {country}
            </label>
          ))}
        <p className="self-start">{error ? error : ''}</p>
      </div>
    </fieldset>
  );
}
