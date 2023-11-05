import React from 'react';

import { EMode, ESize, EVariant } from '@/types';

export interface IButton extends React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  size?: (typeof ESize)[keyof typeof ESize];
  variant?: (typeof EVariant)[keyof typeof EVariant];
  mode?: (typeof EMode)[keyof typeof EMode];
  inProcess?: boolean;
}
