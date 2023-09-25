import React from 'react';

import { EMode } from '@/types';

import cn from 'classnames';
import styles from './default.module.scss';

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  mode?: (typeof EMode)[keyof typeof EMode];
}

export const Input = ({ className, mode, ...props }: IInput) => {
  const [isFocus, setFocus] = React.useState(false);

  const wrapperClassName = React.useMemo(
    () =>
      cn(
        styles.wrapper,
        className,
        {
          [styles.focused]: isFocus,
        },
        {
          [styles['mode--success']]: mode === EMode.SUCCESS,
          [styles['mode--danger']]: mode === EMode.DANGER,
        },
      ),
    [isFocus],
  );

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    setFocus(true);
    props.onFocus && props.onFocus(event);
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    setFocus(false);
    props.onBlur && props.onBlur(event);
  }

  return (
    <div className={wrapperClassName}>
      <input className={styles.element} {...props} onFocus={handleFocus} onBlur={handleBlur} />
    </div>
  );
};
