import { beforeAll, afterAll, afterEach } from 'vitest';
import { server } from "./utils/mocks/node";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());