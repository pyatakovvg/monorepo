import React from 'react';

import { Checkbox } from '../../../Checkbox';

import { IOptionList, TOptionValue } from './types';

import st from './styles/default.module.scss';

function checkActive(value: TOptionValue | TOptionValue[] | null, currentValue: TOptionValue) {
  if (value instanceof Array) {
    return value.some((item) => item === currentValue);
  }
  return value === currentValue;
}

export const Multi = (props: IOptionList) => {
  return (
    <div className={st.wrapper}>
      <Checkbox checked={checkActive(props.value, props.currentValue)} onChange={props.onClick}>
        <div className={st.text}>{props.children}</div>
      </Checkbox>
    </div>
  );
};
