import { useTheme } from '@library/kit';
import { Application, Route } from '@library/app';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Loader } from './components/Loader';
import { Splash } from './components/Splash';
import { Error } from './components/Error';

import { BaseLayout } from './layouts/Base';

const app = new Application({
  routes: [
    new Route('/', () => import('@module/home')),

    new Route('/products/*', [new Route('/', () => import('@module/projects'))], {
      layout: BaseLayout,
    }),

    new Route('/sign-in', () => import('@module/sign-in'), { isPublic: true }),

    new Route('/error', import('./pages/Error'), { isPublic: true }),
    new Route('*', import('./pages/NotPage'), { isPublic: true }),
  ],
});

const root = ReactDOM.createRoot(document.querySelector('#root')!);
const AppView = app.createView();

const App = () => {
  const theme = useTheme();

  React.useEffect(() => {
    theme.setTheme('LIGHT');
  }, []);

  return <AppView Splash={Splash} Error={Error} Loader={Loader} />;
};

root.render(<App />);
