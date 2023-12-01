import { beforeAll, afterAll, afterEach } from 'vitest';
import { server } from "./utils/mocks/node";

beforeAll(() => {
  server.listen();

  console.log('LISTENING...');
  
  server.events.on('request:start', ({ request }) => {
    console.log('MSW intercepted:', request.method, request.url)
  })
});
afterAll(() => server.close());
afterEach(() => server.resetHandlers());