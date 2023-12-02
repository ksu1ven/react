import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setForm, setNewFormAdded } from '../../redux/features/formSlice';
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
    trigger,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  const [countriesFilteredVisible, setCountriesFilteredVisible] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    navigate('/');
  };

  useEffect(() => {
    dispatch(setNewFormAdded(false));
  }, [dispatch]);

  return (
    <>
      <header
        className="bg-pink-100 p-6"
        onClick={() => setCountriesFilteredVisible(false)}
      >
        <Link
          className="bg-pink-800 px-10 py-2 border-solid border-t border-pink-200 text-pink-50"
          to="/"
        >
          Back to Main page
        </Link>
        <h1 className="text-center text-2xl font-bold text-pink-800 uppercase">
          React Hook Form
        </h1>
      </header>
      <main
        className="hook flex justify-center bg-pink-100 h-full min-h-screen"
        onClick={() => {
          setCountriesFilteredVisible(false);
        }}
      >
        <form
          className="flex flex-col h-fit w-1/2 bg-pink-400 p-5 rounded-md"
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
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
            trigger={trigger}
          />
          <button
            className="self-center w-fit bg-pink-800 px-10 py-2 border-solid border-t border-pink-200 text-pink-50 rounded disabled:opacity-50"
            type="submit"
            disabled={!isValid}
          >
            Submit
          </button>
        </form>
      </main>
    </>
  );
}

export default HookFormPage;
