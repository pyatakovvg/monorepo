'use client';

import React from 'react';

import './reset.css';
import './animation.css';
import './fonts/golos-text/default.module.css';

import './light.theme.css';
import './dark.theme.css';

export enum ETheme {
  DARK = 'dark',
  LIGHT = 'light',
}

export const useTheme = () => {
  const [theme, setTheme] = React.useState<keyof typeof ETheme>();

  React.useEffect(() => {
    const htmlElement = document.querySelector('html')!;
    htmlElement.dataset.theme = (theme || '').toLowerCase();
  }, [theme]);

  return {
    setTheme,
  };
};
