import React from 'react';

import { Label } from '@/typography/Label';

import cn from 'classnames';
import styles from './default.module.scss';

export interface IField {
  className?: string;
  required?: boolean;
  label: string;
  children: React.ReactNode;
}

export const Field: React.FC<IField> = (props) => {
  const fieldClassName = React.useMemo(() => cn(), []);

  return (
    <div className={fieldClassName}>
      <div className={styles.label}>
        <Label required={props.required}>{props.label}</Label>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
