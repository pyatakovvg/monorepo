import { registerRoute } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

const CACHE_FONTS_NAME = `qand-fonts-mobile`;
const CACHE_IMAGES_NAME = `qand-images-mobile`;
const CACHE_GOOGLE_FONTS_NAME = `qand-google-fonts-mobile`;

export default function () {
  registerRoute(
    ({ request }) => request.destination === 'font',
    new StaleWhileRevalidate({
      cacheName: CACHE_FONTS_NAME,
    }),
  );

  registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
      cacheName: CACHE_GOOGLE_FONTS_NAME,
    }),
  );

  registerRoute(
    ({ request }) => request.destination === 'image',
    new NetworkFirst({
      cacheName: CACHE_IMAGES_NAME,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 дней
        }),
      ],
    }),
  );
}
