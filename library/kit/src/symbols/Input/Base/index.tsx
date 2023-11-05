import React from 'react';

import { EMode } from '@/types';

import { IInput } from './types';

import cn from 'classnames';
import styles from './styles/default.module.scss';

export const Input = ({ className, mode, placeholder, ...props }: IInput) => {
  const [isFocus, setFocus] = React.useState(false);
  const [isHover, setHover] = React.useState(false);
  const [isPlaceholder, setPlaceholder] = React.useState(false);

  const wrapperClassName = React.useMemo(
    () =>
      cn(
        styles.wrapper,
        className,
        {
          [styles.hover]: isHover,
          [styles.focused]: isFocus,
          [styles.disabled]: props.disabled,
          [styles.readonly]: props.readOnly,
        },
        {
          [styles['mode--danger']]: mode === EMode.DANGER,
        },
      ),
    [isFocus, isHover, mode, className, props.disabled, props.readOnly],
  );

  React.useEffect(() => {
    if (isFocus) {
      setPlaceholder(false);
      return void 0;
    }
    if (props.value) {
      setPlaceholder(false);
      return void 0;
    }
    setPlaceholder(true);
  }, [props.value, isFocus]);

  function handleEnter() {
    setHover(true);
  }

  function handleLeave() {
    setHover(false);
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    setFocus(true);
    props.onFocus && props.onFocus(event);
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    setFocus(false);
    props.onBlur && props.onBlur(event);
  }

  return (
    <div className={wrapperClassName} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <input className={styles.element} {...props} onFocus={handleFocus} onBlur={handleBlur} />
      {isPlaceholder && (
        <div className={styles.placeholder}>
          <div className={styles.text}>{placeholder}</div>
        </div>
      )}
    </div>
  );
};
