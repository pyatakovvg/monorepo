import React from 'react';
import { configure } from 'mobx';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import { WithEvents } from '@/common/WithEvents';

import { Route } from '../Route';
import { ApplicationRoutes, IRoutes } from '../Routes';
import { ApplicationService } from './application.service';

configure({
  enforceActions: 'never',
});

export interface IApplicationParams {
  routes: Route[];
}

export interface IApplicationViewProps {
  Splash: React.FC;
  Loader: React.FC;
  Error: React.FC<FallbackProps>;
}

export interface IApplication {
  createView(): React.FC<IApplicationViewProps>;
}

export interface IApplicationContext {
  appService: ApplicationService;
}

export const context = React.createContext<IApplicationContext>({} as IApplicationContext);
const Provider = context.Provider;

export class Application extends WithEvents implements IApplication {
  private readonly _routes: IRoutes;
  private readonly _service: ApplicationService = new ApplicationService(this);

  constructor(params: IApplicationParams) {
    super();

    this._routes = new ApplicationRoutes(params.routes);
  }

  createView(): React.FC<IApplicationViewProps> {
    const Routes = this._routes.createView();

    return (props) => {
      return (
        <ErrorBoundary FallbackComponent={props.Error}>
          <Provider
            value={{
              appService: this._service,
            }}
          >
            <BrowserRouter>
              <Routes Splash={props.Splash} Loader={props.Loader} />
            </BrowserRouter>
          </Provider>
        </ErrorBoundary>
      );
    };
  }
}
