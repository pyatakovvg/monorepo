import React from 'react';

interface IFormProps {}

export const Form = (props: React.PropsWithChildren<IFormProps>) => {
  return props.children;
};
