import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
import { yupResolver } from '@hookform/resolvers/yup';

export function HookFormPage() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: unknown) => {
    alert(JSON.stringify(data));
  };
  const onError = (data: unknown) => {
    console.log(data);
  };

  return (
    <>
      <header>
        <Link to="/">Back to Main page</Link>
      </header>
      <main>
        <form action="" onSubmit={handleSubmit(onSubmit, onError)}>
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
            register={register}
            watchCountry={watch('country')}
            setValue={setValue}
            error={errors.country?.message}
            setError={setError}
          />
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}

export default HookFormPage;
