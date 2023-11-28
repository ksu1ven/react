import { object, string, number, boolean, ref } from 'yup';

export const validationSchema = object({
  name: string()
    .required('This is a required field')
    .strict(true)
    .uppercase('Name must begin with a capital letter'),

  age: number()
    .required('This is a required field')
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
  accept: boolean().oneOf([true], 'You must accept T&C'),
  image: object({
    size: number()
      .required('Image is required')
      .max(150000, 'The image size must be up to 150 kB'),

    type: string()
      .required('Image is required')
      .oneOf(
        ['image/png', 'image/jpeg'],
        'The image must be in PNG or JPEG format'
      ),
  }),
});
