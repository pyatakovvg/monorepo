import React from 'react';

import { ESize } from '@/types';

import cn from 'classnames';
import styles from './default.module.scss';

export interface ISpinner {
  size?: (typeof ESize)[keyof typeof ESize];
}

export const Spinner = ({ size }: ISpinner) => {
  const spinnerClassName = React.useMemo(
    () =>
      cn(styles.spinner, {
        [styles['size--small']]: size === ESize.SMALL,
        [styles['size--large']]: size === ESize.LARGE,
      }),
    [size],
  );

  return (
    <span className={spinnerClassName}>
      <span />
    </span>
  );
};
