import {
  UseFormRegister,
  UseFormSetValue,
  UseFormSetError,
} from 'react-hook-form';

type Fields = {
  accept?: boolean;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  image?: File;
  passwordRepeat: string;
  country: string;
};

export type Register = UseFormRegister<Fields>;
export type SetValue = UseFormSetValue<Fields>;
export type SetError = UseFormSetError<Fields>;

export type FormHookProps = {
  register: Register;
  error: string | undefined;
};

export type FormHookPasswordsProps = {
  register: Register;
  watchPassword: string | undefined;
  error: {
    errorPassword: string | undefined;
    errorPasswordRepeat: string | undefined;
  };
};

export type File = {
  0: {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
  };
  length: number;
};
