import React from 'react';
import { FallbackProps } from 'react-error-boundary';

import styles from './default.module.scss';

export const Error: React.FC<FallbackProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <p>{props.error.message}</p>
      <button onClick={props.resetErrorBoundary}>Обновить</button>
    </div>
  );
};
