import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { APPLICATION_ERROR, APPLICATION_UNAUTHORIZED } from './variables';
import { emmiter } from './application.emitter';
import { WithEvents } from './common/WithEvents';
import { Route as AppRoute } from './Route';
import { context as applicationContext } from './application/Application';
import { observer } from 'mobx-react';

export interface IRotesViewProps {
  Splash: React.FC;
  Loader: React.FC;
}

export interface IPropsWithAppRoute {
  route: AppRoute;
}

export interface IRoutes {
  createView(): React.FC<IRotesViewProps>;
}

const cache = new Map();

const LoadView: React.FC<IRotesViewProps & IPropsWithAppRoute> = (props) => {
  const [View, setModule] = React.useState<any>(null);

  React.useEffect(() => {
    (async () => {
      const View = await AppRoute.loadModule(props.route.content);

      if (props.route.options?.isCacheable && cache.has(props.route.path)) {
        return setModule(cache.get(props.route.path));
      }

      if (props.route.options?.isCacheable) {
        cache.set(props.route.path, View);
      }

      setTimeout(() => setModule(View), 200);
    })();
    return () => {
      setModule(null);
    };
  }, [props.route]);

  if (!View) {
    return <props.Loader />;
  }

  return <View />;
};

const Loader: React.FC<IRotesViewProps & IPropsWithAppRoute> = (props) => {
  if (props.route.content instanceof Array) {
    return (
      <Routes>
        {props.route.content.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<SecondStep route={route} Splash={props.Splash} Loader={props.Loader} />}
            />
          );
        })}
      </Routes>
    );
  }
  return <LoadView {...props} />;
};

const SecondStep: React.FC<IRotesViewProps & IPropsWithAppRoute> = (props) => {
  if (props.route.options?.layout) {
    return (
      <props.route.options.layout>
        <Loader {...props} />
      </props.route.options.layout>
    );
  }

  return <Loader {...props} />;
};

const FirstStep: React.FC<IRotesViewProps & IPropsWithAppRoute> = observer((props) => {
  const { appService } = React.useContext(applicationContext);

  React.useEffect(() => {
    if (props.route.options?.isPublic) {
      setTimeout(() => appService.setStarted(true), 1000);
      return void 0;
    }
    (async () => {
      await appService.getProfile();
      setTimeout(() => appService.setStarted(true), 1000);
    })();
  }, []);

  if (!appService.getStarted()) {
    return <props.Splash />;
  }

  return <SecondStep {...props} />;
});

export class ApplicationRoutes extends WithEvents implements IRoutes {
  constructor(private readonly routes: AppRoute[] = []) {
    super();
  }

  createView(): React.FC<IRotesViewProps> {
    return observer((props) => {
      const navigate = useNavigate();

      React.useEffect(() => {
        emmiter.on<string>('application', (result) => {
          if (result) {
            switch (result.type) {
              case APPLICATION_UNAUTHORIZED:
                return navigate('/sign-in');
              case APPLICATION_ERROR:
                return navigate('/error');
            }
          }
        });
      }, []);

      return (
        <Routes>
          {this.routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={process.env.PUBLIC_URL + route.path}
                element={<FirstStep route={route} Splash={props.Splash} Loader={props.Loader} />}
              />
            );
          })}
        </Routes>
      );
    });
  }
}
