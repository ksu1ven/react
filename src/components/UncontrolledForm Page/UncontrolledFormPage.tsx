import { useRef } from 'react';
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

export function UncontrolledFormPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRepeatRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      console.log(imageRef.current?.files);
      await validationSchema.validate(
        {
          name: nameRef.current?.value[0],
          age: Number(ageRef.current?.value),
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          passwordRepeat: passwordRepeatRef.current?.value,
          accept: acceptRef.current?.checked,
          image: {
            size: imageRef.current?.files?.['0']?.size || undefined,
            type: imageRef.current?.files?.['0']?.type || undefined,
          },
        },
        { abortEarly: false }
      );
      dispatch(removeValidationErrors());
    } catch (e: unknown) {
      console.log(e);
      if (e instanceof ValidationError) {
        // console.log(e.inner);
        // console.log(nameRef.current?.value);
        dispatch(setValidationErrors(e.inner));
      }
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
          />
          <InputGender maleRef={maleRef} femaleRef={femaleRef} />
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
