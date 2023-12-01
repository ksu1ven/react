import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  InputCountry,
  InputAccept,
  InputAge,
  InputName,
  InputGender,
  InputPassword,
  InputImage,
  InputEmail,
} from './index';
import { validationSchema } from '../../utils/yup';
import { ValidationError } from 'yup';
import { useDispatch } from 'react-redux';
import {
  setValidationErrors,
  removeValidationErrors,
} from '../../redux/features/errorSlice';
import { showPasswordStrength } from '../../utils/functions';

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

  const dispatch = useDispatch();

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
          gender: imageRef.current?.value,
          image: imageRef.current?.files,
          country: countryRef.current?.value,
        },
        { abortEarly: false }
      );
      dispatch(removeValidationErrors());
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        console.log(e.inner);
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

  return (
    <>
      <header>
        <Link to="/">Back to Main page</Link>
      </header>
      <main>
        <form
          action=""
          onSubmit={(e) => {
            console.log('submit');
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
          <InputCountry inputRef={countryRef} />
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}

export default UncontrolledFormPage;
