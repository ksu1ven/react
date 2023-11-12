import { describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import SearchResults from '../components/SearchPage/SearchResults';
import { MemoryRouter } from 'react-router-dom';
import { SearchResultsContext } from '../components/SearchPage/Contexts';
import App from '../App';
import { createCardsListResponseMock } from './mocks';

describe('Tests for the Card List component', () => {
  it('Component renders the specified number of cards - 10', async () => {
    render(<App />);
    expect(await screen.findByTestId('search-results')).toMatchSnapshot();
    expect(await screen.findAllByText(/testCard/)).toHaveLength(10);
    cleanup();
    const searchResults = render(
      <MemoryRouter>
        <SearchResultsContext.Provider
          value={createCardsListResponseMock(7, 10, false)}
        >
          <SearchResults params={new URLSearchParams('')} setParams={vi.fn()} />
        </SearchResultsContext.Provider>
      </MemoryRouter>
    );
    expect(searchResults).toMatchSnapshot();
    expect(await screen.findAllByText(/testCard/)).toHaveLength(7);
  });

  it('An appropriate message is displayed if no cards are present', async () => {
    const searchResults = render(
      <MemoryRouter>
        <SearchResultsContext.Provider value={[]}>
          <SearchResults params={new URLSearchParams('')} setParams={vi.fn()} />
        </SearchResultsContext.Provider>
      </MemoryRouter>
    );

    expect(searchResults).toMatchSnapshot();
    expect(screen.queryByText('Nothing foundddddddddddd:(')).toBeFalsy();
    expect(screen.getByText('Nothing found:(')).toBeTruthy();
    expect(screen.queryByText(/testCard/)).toBeFalsy();
  });
});
