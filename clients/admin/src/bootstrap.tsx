import { useTheme } from '@library/kit';
import { Application, Route } from '@library/app';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Loader } from './components/Loader';
import { Splash } from './components/Splash';
import { Error } from './components/Error';

import { NavWrapper } from './components/layouts/NavWrapper';
import { SubWrapper } from './components/layouts/SubWrapper';

const app = new Application({
  routes: [
    new Route('/', import('./pages/Home')),

    new Route(
      '/products/*',
      [
        new Route('/', import('./pages/Home'), { layout: SubWrapper }),
        new Route('/new', import('./pages/Next')),
        new Route('/:id', import('./pages/Next')),
      ],
      { layout: NavWrapper },
    ),

    new Route('/sign-in', import('./pages/SignIn'), { isPublic: true }),

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
