import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setForm } from '../../redux/features/formSlice';
import {
  InputCountry,
  InputAccept,
  InputAge,
  InputName,
  InputGender,
  InputPassword,
  InputImage,
  InputEmail,
} from './inputs/index';
import { validationSchema } from '../../utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { fileToBase64 } from '../../utils/functions';
import { Fields } from '../../utils/types';

export function HookFormPage() {
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    setError,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  const [countriesFilteredVisible, setCountriesFilteredVisible] =
    useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (data: Fields) => {
    const { name, age, email, password, gender, image, country } = data;
    const image64 = image ? await fileToBase64(image[0]) : '';
    dispatch(
      setForm({
        name,
        age,
        email,
        password,
        gender,
        image: image64,
        country,
      })
    );
  };

  return (
    <>
      <header onClick={() => setCountriesFilteredVisible(false)}>
        <Link to="/">Back to Main page</Link>
      </header>
      <main
        onClick={() => {
          setCountriesFilteredVisible(false);
        }}
      >
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <InputName register={register} error={errors.name?.message} />
          <InputAge register={register} error={errors.age?.message} />
          <InputEmail register={register} error={errors.email?.message} />
          <InputPassword
            register={register}
            watchPassword={watch('password')}
            error={{
              errorPassword: errors.password?.message,
              errorPasswordRepeat: errors.passwordRepeat?.message,
            }}
          />
          <InputGender register={register} error={errors.gender?.message} />
          <InputAccept register={register} error={errors.accept?.message} />
          <InputImage register={register} error={errors.image?.message} />
          <InputCountry
            countriesFilteredVisible={countriesFilteredVisible}
            setCountriesFilteredVisible={setCountriesFilteredVisible}
            register={register}
            watchCountry={watch('country')}
            setValue={setValue}
            error={errors.country?.message}
            setError={setError}
          />
          <button type="submit" disabled={!isValid}>
            Submit
          </button>
        </form>
      </main>
    </>
  );
}

export default HookFormPage;
