import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { createCardsListResponseMock } from './_mocks';
import mockRouter from 'next-router-mock';
import SearchResults from '../components/SearchResults';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Tests for the Card component', () => {
  it('The card component renders the relevant card data', async () => {
    render(
      <SearchResults
        searchResults={createCardsListResponseMock(10, 10, false)}
      />
    );
    const card = (await screen.findAllByTestId('card'))[0];
    expect(card).toMatchSnapshot();
    expect(screen.getAllByAltText('animal picture')[0]).toBeTruthy();
    expect(screen.getAllByRole('heading')[3]).toHaveTextContent('testCard-3');
    expect(screen.queryByText('Some-text')).toBeFalsy();
    expect(screen.getAllByText('Description: avian')[0]).toBeTruthy();
  });

  it('Clicking on a card opens a detailed card component', async () => {
    render(
      <SearchResults
        searchResults={createCardsListResponseMock(10, 10, false)}
      />
    );
    const card = (await screen.findAllByTestId('card'))[0];
    expect(card).toMatchSnapshot();
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
    fireEvent.click(card);
    expect(mockRouter.query).toMatchObject({
      details: 'testCard-0',
    });
  });
});
