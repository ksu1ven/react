import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchResults from '../components/SearchResults';
import { createCardsListResponseMock } from './_mocks';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Tests for the Card List component', () => {
  it('Component renders the specified number of cards - 7', async () => {
    const searchResults = render(
      <SearchResults
        searchResults={createCardsListResponseMock(7, 10, false)}
      />
    );
    expect(searchResults.baseElement).toMatchSnapshot();
    expect(await screen.findAllByText(/testCard/)).toHaveLength(7);
  });

  it('An appropriate message is displayed if no cards are present', async () => {
    const searchResults = render(<SearchResults searchResults={[]} />);

    expect(searchResults.baseElement).toMatchSnapshot();
    expect(screen.queryByText('Nothing foundddddddddddd:(')).toBeFalsy();
    expect(screen.getByText('Nothing found:(')).toBeTruthy();
    expect(screen.queryByText(/testCard/)).toBeFalsy();
  });
});
