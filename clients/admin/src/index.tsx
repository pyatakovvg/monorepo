import 'reflect-metadata';

import * as worker from './sw';
import(/* webpackChunkName: "bootstrap" */ './bootstrap');

import('./styles/index.module.scss');

(async () => {
  if ('serviceWorker' in navigator) {
    if (process.env.REACT_APP_USE_SERVICE_WORKER !== 'true') {
      await worker.unregister();
      return void 0;
    }

    await worker.register({
      onUpdate(registration: ServiceWorkerRegistration) {
        if (registration.waiting) {
          registration.waiting.postMessage('SKIP_WAITING');
          console.debug('Service-worker был обновлен');
        }
      },
      onSuccess() {
        console.debug('Service-worker зарегистрирован');
      },
      onFail(error: Error) {
        console.log('Ошибка в работе service-worker', error);
      },
    });
  }
})();
