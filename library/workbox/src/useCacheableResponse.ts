
import { ExpirationPlugin } from 'workbox-expiration';
import { NetworkFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';


const CACHE_REQUESTS_API_V1_NAME = `qand-requests-api-v1-mobile`;


export default function() {

  registerRoute(
    ({ url }) => {
      return url.pathname.match('/api/v1/')
    },
    new NetworkFirst({
      cacheName: CACHE_REQUESTS_API_V1_NAME,
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin ({
          maxAgeSeconds: 24 * 60 * 60, // 1 день
        }),
      ],
    })
  );
}
