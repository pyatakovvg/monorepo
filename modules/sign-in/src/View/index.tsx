import { Fetch } from '@helper/fetch';
import { Heading } from '@library/kit';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Form } from './Form';

import s from './default.module.scss';

export const SignInView = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fetch = new Fetch({
      baseURL: 'http://localhost:4020',
    });

    const login: HTMLInputElement = event.currentTarget.querySelector('[name="login"]')!;
    const password: HTMLInputElement = event.currentTarget.querySelector('[name="password"]')!;

    fetch
      .send({
        url: '/auth/login',
        method: 'post',
        data: {
          email: login.value.trim(),
          password: password.value.trim(),
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
          <Heading variant={'h2'}>Авторизоваться</Heading>
        </div>
        <div className={s.form}>
          <Form onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
