import React from 'react';

import { IIcon, IWeight } from './types';

import cn from 'classnames';
import styles from './default.module.scss';

export interface IIconProps {
  weight?: IWeight;
  icon: IIcon;
}

export const Icon: React.FC<IIconProps> = React.memo((props) => {
  return <i className={cn(styles.icon, `fa-${props.weight ?? 'solid'} fa-${props.icon}`)} />;
});

export { icons, IIcon, weights, IWeight } from './types';
