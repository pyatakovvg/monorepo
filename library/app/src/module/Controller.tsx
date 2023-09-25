import { Event, TEventCallback, IEventData } from '@/common/Event';

import { IApplication } from '../application/Application';

export function Controller() {
  return function <T extends { new (...args: any[]): any }>(Constructor: T): T {
    return class extends Constructor {
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
    };
  };
}
