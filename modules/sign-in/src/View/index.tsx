import { Fetch } from '@helper/fetch';
import { Heading } from '@library/kit';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { SignInForm, IFormValues } from './Form';

import s from './default.module.scss';

export const SignInView = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: IFormValues) => {
    const fetch = new Fetch({
      baseURL: 'http://localhost:4020',
    });

    fetch
      .send({
        url: '/auth/login',
        method: 'post',
        data: {
          email: values.login.trim(),
          password: values.password.trim(),
        },
      })
      .then((result) => {
        console.log(result);
        navigate(process.env.PUBLIC_URL + '/');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.header}>
          <Heading variant={'h2'}>Авторизация</Heading>
        </div>
        <div className={s.form}>
          <SignInForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
