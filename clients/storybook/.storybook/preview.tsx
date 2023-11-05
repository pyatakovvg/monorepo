/** @type { import('@storybook/react').Preview } */

import { useEffect, useGlobals } from '@storybook/addons';

import '!!style-loader!css-loader!@library/kit/lib/theme/reset.css';

export const decorators = [
  (StoryFn) => {
    const [{ theme }] = useGlobals();

    useEffect(() => {
      document.querySelector('html').dataset.theme = theme || 'light';
    }, [theme]);

    return StoryFn();
  },
];

export const globalTypes = {
  theme: {
    name: 'Тема',
    description: 'Тема компонентов',
    toolbar: {
      // The label to show for this toolbar item
      title: 'Тема',
      icon: 'globe',
      // Array of plain string values or MenuItem shape (see below)
      items: [
        {
          value: 'light',
          icon: 'circlehollow',
          title: 'Светлая',
          right: 'по умолчанию',
        },
        { value: 'dark', icon: 'circle', title: 'Темная' },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
