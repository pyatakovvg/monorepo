import { Field, Input, IField } from '@library/kit';
import React from 'react';

export const InputField = (props: IField) => {
  const [value, setValue] = React.useState(props.children);
  return (
    <Field label={props.label} required={props.required}>
      <Input
        value={value?.toString()}
        onChange={e => setValue(e.target.value)}
      />
    </Field>
  );
};
