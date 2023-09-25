import React, { Suspense } from 'react';
import { observer } from 'mobx-react';

import { Event, TEventCallback, IEventData } from '@/common/Event';

import { Provider } from './module.context';
import { context as applicationContext, IApplication } from '../application/Application';

export interface IRouteParams {
  view: React.LazyExoticComponent<any>;
  controller: any;
}

export interface IModuleViewProps {
  Splash: React.FC;
  Loader: React.FC;
}

const createInstance = (Target: any) => {
  if (!Target) {
    return null;
  }
  return new Target();
};

export function Module(params: IRouteParams) {
  return function <T extends { new (...args: any[]): any }>(Constructor: T): T {
    return class extends Constructor {
      name = 'No name';
      controller = createInstance(params.controller);
      _events = new Event();
      _application: IApplication | null = null;

      constructor(...rest: any[]) {
        super(...rest);
        this.name = Object.getPrototypeOf(this).name;
      }

      on<T>(name: string, cb: TEventCallback<T>) {
        this._events.on(name, cb);
      }

      emit<T>(name: string, data: IEventData<T>) {
        this._events.emit(name, data);
      }

      off<T>(name: string, cb: TEventCallback<T>) {
        this._events.on(name, cb);
      }

      setApplication(application: IApplication) {
        this._application = application;
      }

      createView(): React.FC<any> {
        const View = params.view;

        return observer(() => {
          React.useEffect(() => {
            this._events.emit('module:mount', {
              type: 'MODULE_MOUNT',
              data: this,
            });
            return () => {
              this._events.emit('module:unmount', {
                type: 'MODULE_UNMOUNT',
                data: this,
              });
            };
          }, []);

          return (
            <Provider
              value={{
                controller: this.controller,
              }}
            >
              <Suspense fallback={<p>kjhkj</p>}>
                <View />
              </Suspense>
            </Provider>
          );
        });
      }
    };
  };
}
