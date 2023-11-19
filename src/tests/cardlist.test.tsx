import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchResults from '../components/SearchPage/SearchResults';
import { createCardsListResponseMock } from './mocks';

vi.mock('react-redux');

describe('Tests for the Card List component', () => {
  it('Component renders the specified number of cards - 10', async () => {
    const searchResults = render(
      <MemoryRouter>
        <SearchResults
          params={new URLSearchParams('')}
          setParams={vi.fn()}
          searchResults={createCardsListResponseMock(7, 10, false)}
        />
      </MemoryRouter>
    );
    expect(searchResults.baseElement).toMatchSnapshot();
    expect(await screen.findAllByText(/testCard/)).toHaveLength(7);
  });

  it('An appropriate message is displayed if no cards are present', async () => {
    const searchResults = render(
      <MemoryRouter>
        <SearchResults
          params={new URLSearchParams('')}
          setParams={vi.fn()}
          searchResults={[]}
        />
      </MemoryRouter>
    );

    expect(searchResults.baseElement).toMatchSnapshot();
    expect(screen.queryByText('Nothing foundddddddddddd:(')).toBeFalsy();
    expect(screen.getByText('Nothing found:(')).toBeTruthy();
    expect(screen.queryByText(/testCard/)).toBeFalsy();
  });
});
