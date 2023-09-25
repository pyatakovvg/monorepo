import React from 'react';

import { EMode, ESize } from '@/types';

import cn from 'classnames';
import styles from './default.module.scss';

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: (typeof ESize)[keyof typeof ESize];
  mode?: (typeof EMode)[keyof typeof EMode];
  inProcess?: boolean;
  secondary?: boolean;
  children: React.ReactNode;
}

export const Button = ({ className, inProcess, size, mode, children, secondary, ...rest }: IButton) => {
  const buttonClassName = React.useMemo(
    () =>
      cn(
        className,
        styles.button,
        {
          [styles['secondary']]: secondary,
        },
        {
          [styles['in-process']]: inProcess,
        },
        {
          [styles['size--small']]: size === ESize.SMALL,
          [styles['size--large']]: size === ESize.LARGE,
        },
        {
          [styles['mode--danger']]: mode === EMode.DANGER,
          [styles['mode--success']]: mode === EMode.SUCCESS,
        },
      ),
    [className, inProcess, mode, size, secondary, rest.disabled],
  );

  return (
    <button {...rest} className={buttonClassName} disabled={inProcess || rest.disabled}>
      <div className={styles.container}>
        <div className={styles.text}>{children}</div>
      </div>
    </button>
  );
};
