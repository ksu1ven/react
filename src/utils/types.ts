import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

export type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  image: string;
  country: string;
};

export type Fields = {
  accept?: boolean;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  image?: FileList;
  passwordRepeat: string;
  country: string;
};

export type Register = UseFormRegister<Fields>;
export type SetValue = UseFormSetValue<Fields>;
export type Trigger = UseFormTrigger<Fields>;

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
