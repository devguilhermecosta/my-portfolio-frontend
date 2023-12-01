import '@testing-library/jest-dom';
import { server } from './src/utils/mocks/node';

beforeAll(() => {server.listen()});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
