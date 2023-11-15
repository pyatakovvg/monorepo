import React from 'react';
import { Field, FieldProps } from 'formik';

import { EMode } from '@/types';
import { Input } from '@/symbols/Input/Base';
import { IInput } from '@/symbols/Input/Base/types';
import { Field as FieldLabel } from '@/symbols/Field';

interface IInputFieldProps extends IInput {
  name: string;
  label?: string;
  type?: 'email' | 'password';
}

export const InputField = ({ name, ...props }: IInputFieldProps) => {
  return (
    <Field name={name}>
      {({ field, form: { touched, errors }, meta }: FieldProps) => {
        console.log(field, meta, touched, errors);
        return (
          <FieldLabel label={props.label} message={errors[name]}>
            <Input {...props} {...field} mode={name && errors[name] ? EMode.DANGER : EMode.DEFAULT} />
          </FieldLabel>
        );
      }}
    </Field>
  );
};
