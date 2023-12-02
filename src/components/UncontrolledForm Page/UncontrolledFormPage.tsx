import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useDispatch } from 'react-redux';
import {
  setValidationErrors,
  removeValidationErrors,
} from '../../redux/features/errorSlice';
import { setForm, setNewFormAdded } from '../../redux/features/formSlice';
import { showPasswordStrength, fileToBase64 } from '../../utils/functions';
import { validationSchema } from '../../utils/yup';
import { ValidationError } from 'yup';

export function UncontrolledFormPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRepeatRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [countriesFilteredVisible, setCountriesFilteredVisible] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(
        {
          name: nameRef.current?.value[0],
          age: Number(ageRef.current?.value),
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          passwordRepeat: passwordRepeatRef.current?.value,
          accept: acceptRef.current?.checked,
          gender: genderRef.current?.value,
          image: imageRef.current?.files,
          country: countryRef.current?.value,
        },
        { abortEarly: false }
      );
      dispatch(removeValidationErrors());

      const image64 =
        imageRef.current && imageRef.current.files
          ? await fileToBase64(imageRef.current.files[0])
          : '';

      dispatch(
        setForm({
          name: nameRef.current?.value[0],
          age: Number(ageRef.current?.value),
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          gender: genderRef.current?.value,
          image: image64,
          country: countryRef.current?.value,
        })
      );
      setTimeout(() => navigate('/'), 1000);
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        dispatch(setValidationErrors(e.inner));
      }
    } finally {
      showPasswordStrength(passwordRef.current?.value || '').then(
        (strength) => {
          setPasswordStrength(strength);
        }
      );
    }
  };

  useEffect(() => {
    dispatch(setNewFormAdded(false));
  }, [dispatch]);

  return (
    <main
      className="h-full min-h-screen bg-cyan-100 pb-10"
      onClick={(e) => {
        if (e.target !== countryRef.current) {
          setCountriesFilteredVisible(false);
        }
      }}
    >
      <header
        className="bg-cyan-100 p-6"
        onClick={() => setCountriesFilteredVisible(false)}
      >
        <Link
          to="/"
          className="bg-cyan-800 px-10 py-2 border-solid border-t border-cyan-200 text-cyan-50"
          onClick={() => {
            dispatch(removeValidationErrors());
          }}
        >
          Back to Main page
        </Link>
        <h1 className="text-center text-2xl font-bold text-cyan-800 uppercase">
          Uncontrolled form
        </h1>
      </header>
      <section className="uncontrolled flex justify-center">
        <form
          className="flex flex-col h-fit w-1/2 bg-cyan-500 p-5 rounded-md"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <InputName inputRef={nameRef} />
          <InputAge inputRef={ageRef} />
          <InputEmail inputRef={emailRef} />
          <InputPassword
            passwordRef={passwordRef}
            passwordRepeatRef={passwordRepeatRef}
            strength={passwordStrength}
          />
          <InputGender genderRef={genderRef} />
          <InputAccept inputRef={acceptRef} />
          <InputImage inputRef={imageRef} />
          <InputCountry
            inputRef={countryRef}
            countriesFilteredVisible={countriesFilteredVisible}
            setCountriesFilteredVisible={setCountriesFilteredVisible}
          />
          <button
            type="submit"
            className="self-center w-fit bg-cyan-800 px-10 py-2 border-solid border-t border-cyan-200 text-cyan-50 rounded"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}

export default UncontrolledFormPage;
