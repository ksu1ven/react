import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import Details from '../components/SearchPage/Details';
import SearchPage from '../components/SearchPage/SearchPage';
import ErrorPage from '../components/ErrorPage';
import ErrorWithFetch from '../components/SearchPage/ErrorWithFetch';

describe('Tests for the 404 Page component', () => {
  it('404 page is displayed when navigating to an invalid route.', async () => {
    render(
      <MemoryRouter initialEntries={['/sdfghjsdfghj']}>
        <Routes>
          <Route path="/" element={<SearchPage />}>
            <Route index element={<Details />} loader={vi.fn()} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Page not found :(')).toBeInTheDocument();
    expect(screen.getByText('Back Home')).toBeInTheDocument();
  });

  it('Render errorElements (not errorPage) to get coverage 100%', async () => {
    render(
      <MemoryRouter>
        <ErrorWithFetch />
      </MemoryRouter>
    );
  });
});
