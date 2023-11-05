import React from 'react';

import styles from './default.module.scss';

export const Header: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.aside}>
          <nav>
            <span>sdfsdfsd</span>
            <span>sdfsdfsd</span>
            <span>sdfsdfsd</span>
            <span>sdfsdfsd</span>
          </nav>
        </div>
        <div className={styles.content}>{props.children}</div>
      </div>
      <div className={styles.footer}>
        <p>footer</p>
      </div>
    </div>
  );
};
