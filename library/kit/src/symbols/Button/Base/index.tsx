import React from 'react';

import { IButton } from './types';

import { EMode, ESize, EVariant } from '@/types';

import cn from 'classnames';
import styles from './styles/default.module.scss';

export const Button = ({
  className,
  inProcess,
  size,
  mode,
  variant = EVariant.PRIMARY,
  children,
  ...rest
}: IButton) => {
  const buttonClassName = React.useMemo(
    () =>
      cn(
        className,
        {
          [styles.primary]: variant === EVariant.PRIMARY,
          [styles.secondary]: variant === EVariant.SECONDARY,
          // [styles.ghost]: variant === EVariant.GHOST,
        },
        {
          [styles['size--small']]: size === ESize.SMALL,
          [styles['size--large']]: size === ESize.LARGE,
        },
        {
          [styles['mode--danger']]: mode === EMode.DANGER,
          [styles['mode--success']]: mode === EMode.SUCCESS,
        },
        {
          [styles['in-process']]: inProcess,
        },
      ),
    [className, inProcess, mode, size, variant, rest.disabled],
  );

  return (
    <button {...rest} className={buttonClassName} disabled={inProcess || rest.disabled}>
      <div className={styles.container}>
        <div className={styles.text}>{children}</div>
      </div>
    </button>
  );
};
