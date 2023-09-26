import { Input, Button } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

interface IFormProps {
  onSubmit(event: React.FormEvent<HTMLFormElement>): void;
}

export const Form: React.FC<IFormProps> = (props) => {
  return (
    <form className={s.wrapper} onSubmit={props.onSubmit}>
      <div className={s.content}>
        <div className={s.row}>
          <Input type={'email'} name={'login'} />
        </div>
        <div className={s.row}>
          <Input type={'password'} name={'password'} />
        </div>
      </div>
      <div className={s.control}>
        <Button type={'submit'}>Войти</Button>
      </div>
    </form>
  );
};
