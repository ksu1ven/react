import { object, string, number, boolean, ref, mixed } from 'yup';
import { store } from '../redux/store/store';

const countriesList = store.getState().countries.countries;

export const validationSchema = object({
  name: string()
    .required('This is a required field')
    .matches(/^[A-ZА-Я].*$/, 'Name must begin with a capital letter'),

  age: number()
    .required('This is a required field')
    .typeError('Age must be number')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('This is a required field'),

  email: string()
    .required('This is a required field')
    .email('Email is not valid'),
  password: string()
    .required('This is a required field')
    .matches(/^(?=.*[a-zа-я])/, 'Must contain at least one lowercase character')
    .matches(/^(?=.*[A-ZА-Я])/, 'Must contain at least one uppercase character')
    .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
    .matches(
      /^(?=.*[!@#%&$^*()?><|+=])/,
      'Must contain at least one special character'
    ),
  passwordRepeat: string()
    .required('This is a required field')
    .oneOf([ref('password')], 'Passwords must match'),
  gender: string().required(),
  accept: boolean().oneOf([true], 'You must accept T&C'),
  image: mixed<FileList>()
    .test('extension', 'Image is required', (value) => {
      return value?.length == 1;
    })
    .test('fileSize', 'The image size must be up to 200 kB', (file) => {
      if (!file?.length) return false;
      return file[0].size <= 204800;
    })
    .test('extension', 'The image must be in PNG or JPEG format', (file) => {
      if (!file?.length) return false;
      return file[0].type == 'image/png' || file[0].type === 'image/jpeg';
    }),
  country: string()
    .required('This is a required field')
    .test('includes in list', "Country doesn't exist", (value) => {
      return countriesList
        .map((el) => el.toLowerCase())
        .includes(value.toLowerCase());
    }),
});

export const passwordSchema = object({
  password: string()
    .required('This is a required field')
    .matches(/^(?=.*[a-zа-я])/, 'Must contain at least one lowercase character')
    .matches(/^(?=.*[A-ZА-Я])/, 'Must contain at least one uppercase character')
    .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
    .matches(
      /^(?=.*[!@#%&$^*()?><|+=])/,
      'Must contain at least one special character'
    ),
});
