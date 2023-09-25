import { clientsClaim, skipWaiting, setCacheNameDetails } from 'workbox-core';
import { registerRoute, NavigationRoute, Route } from 'workbox-routing';
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';

import useCacheableResponse from './useCacheableResponse';
import useCacheableResources from './useCacheableResources';

declare let self: ServiceWorkerGlobalScope;

/**
 * Применяем версию воркера немедленно для всех вкладок
 */
setCacheNameDetails({
  prefix: 'qand',
  suffix: 'mobile',
  precache: 'precache',
  runtime: 'runtime-cache',
});

clientsClaim();
skipWaiting();

/**
 * Получаем существующий кэш-манифест или устанавливаем пустой
 */
const manifest = self.__WB_MANIFEST || [];

/**
 * Устанавливаем манифест
 */
cleanupOutdatedCaches();
precacheAndRoute(manifest, {
  ignoreURLParametersMatching: [/.*/],
});

/**
 * Устанавливаем точку входа для любого "url" как "index.html"
 */
const navigationHandler = createHandlerBoundToURL(process.env['PUBLIC_URL'] + '/index.html');

const navigationRoute = new NavigationRoute(navigationHandler);

registerRoute(navigationRoute);

/**
 * Дополнительные настройки кеширования ресурсов
 */
useCacheableResponse();
useCacheableResources();

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting().then(() => console.log('Все вкладки были обновлены'));
  }
});
