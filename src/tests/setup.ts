import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { createCardsResponseMock } from './mocks';

export const handlers = [
  http.post('https://stapi.co/api/v1/rest/animal/search', ({ request }) => {
    const url = new URL(request.url);
    const details = url.searchParams.get('details');

    if (details) {
      return HttpResponse.json(createCardsResponseMock(1, 10));
    }

    return HttpResponse.json(createCardsResponseMock(200, 10));
  }),
];

export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
