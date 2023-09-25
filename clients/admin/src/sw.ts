interface IConfig {
  onUpdate?(registration: ServiceWorkerRegistration): void;
  onSuccess?(registration: ServiceWorkerRegistration): void;
  onFail?(error: Error): void;
}

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
);

export async function register(config?: IConfig) {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

    if (publicUrl.origin !== window.location.origin) {
      return void 0;
    }

    const swUrl = `service-worker.js`;

    if (isLocalhost) {
      await checkValidServiceWorker(swUrl, config);
      await navigator.serviceWorker.ready;

      console.log('Это приложение сначала обслуживается кешем из serviceWorker');
    } else {
      await registerValidSW(swUrl, config);
    }
  }
}

async function registerValidSW(swUrl: string, config?: IConfig) {
  navigator.serviceWorker
    .register(swUrl, { scope: './' })
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;

        if (installingWorker == null) {
          return;
        }

        installingWorker.onstatechange = () => {
          if (registration.waiting) {
            if (navigator.serviceWorker.controller) {
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error: Error) => {
      if (config && config.onFail) {
        config.onFail(error);
      }
    });

  if (!isLocalhost) {
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        window.location.reload();
        refreshing = true;
      }
    });
  }
}

async function checkValidServiceWorker(swUrl: string, config?: IConfig) {
  try {
    const response: Response = await fetch(swUrl);
    const contentType = response.headers.get('content-type');

    if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();

      window.location.reload();
    } else {
      await registerValidSW(swUrl, config);
    }
  } catch (error) {
    if (config && config.onFail) {
      config.onFail(new Error('Нет интернет соединения'));
    }
  }
}

export async function unregister() {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    await registration.unregister();
  }
}
