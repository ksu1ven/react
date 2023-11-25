import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createCardsListResponseMock, createCardsResponseMock } from './_mocks';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Details from '../components/Details';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

vi.stubGlobal('getServerSideProps', {
  searchValue: '',
  response: createCardsResponseMock(10, 10, false),
  detailsResponse: createCardsResponseMock(1, 1, true),
  paginationButtonsValue: [1, 2, 3],
});

describe('Tests for the Detailed Card component', () => {
  it('Detailed card component correctly displays the detailed card data;', async () => {
    const data = createCardsListResponseMock(1, 1, true)[0];
    const reverseData = {
      avian: false,
      canine: true,
      earthAnimal: true,
      earthInsect: true,
      feline: true,
      name: '',
      uid: '',
    };

    render(<Details detailsData={data} />);
    expect(screen.getByTestId('details')).toMatchSnapshot();
    expect(await screen.findByTestId('details-h1')).toHaveTextContent(
      'details'
    );
    expect(screen.getByText('EarthAnimal: No')).toBeInTheDocument();
    expect(screen.getByText('Avian: Yes')).toBeInTheDocument();
    cleanup();
    render(<Details detailsData={reverseData} />);
    expect(screen.getByTestId('details')).toMatchSnapshot();
    expect(await screen.findByTestId('details-h1')).toHaveTextContent('');
    expect(screen.getByText('EarthAnimal: Yes')).toBeInTheDocument();
    expect(screen.getByText('Avian: No')).toBeInTheDocument();
  });

  it('Clicking the close button hides the component.', async () => {
    mockRouter.push('/?details=details');
    render(
      <Details detailsData={createCardsListResponseMock(1, 1, true)[0]} />,
      { wrapper: MemoryRouterProvider }
    );
    expect(await screen.findByTestId('details')).toBeInTheDocument();
    expect(screen.getByTestId('details')).toMatchSnapshot();
    fireEvent.click(screen.getByTestId('cross'));
    expect(mockRouter.asPath).toEqual('/');
  });
});
