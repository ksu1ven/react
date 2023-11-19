import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  RouterProvider,
  MemoryRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Details from '../components/SearchPage/Details';
import SearchPage from '../components/SearchPage/SearchPage';
import SearchResults from '../components/SearchPage/SearchResults';
import { createCardsListResponseMock } from './mocks';
import * as mockSearchCards from '../redux/api/searchCards';

describe('Tests for the Card component', () => {
  const routes = createRoutesFromElements(
    <Route
      path="/"
      element={
        <Provider store={store}>
          <SearchPage />
        </Provider>
      }
    >
      <Route
        index
        element={
          <Provider store={store}>
            <Details />
          </Provider>
        }
      />
    </Route>
  );

  it('The card component renders the relevant card data', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchResults
            params={new URLSearchParams('')}
            setParams={vi.fn()}
            searchResults={createCardsListResponseMock(7, 10, false)}
          />
        </Provider>
      </MemoryRouter>
    );
    const card = (await screen.findAllByTestId('card'))[0];
    expect(card).toMatchSnapshot();
    expect(screen.getAllByAltText('animal picture')[0]).toBeTruthy();
    expect(screen.getAllByRole('heading')[3]).toHaveTextContent('testCard-3');
    expect(screen.queryByText('Some-text')).toBeFalsy();
    expect(screen.getAllByText('Description: avian')[0]).toBeTruthy();
  });

  it('Clicking on a card opens a detailed card component', async () => {
    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router} />);
    const card = (await screen.findAllByTestId('card'))[0];
    expect(card).toMatchSnapshot();
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
    fireEvent.click(card);
    expect(router.state.location.search).toBe('?details=testCard-0');
    const details = await screen.findByTestId('details');
    expect(details).toMatchSnapshot();
    expect(details).toBeInTheDocument();
  });

  it('Clicking triggers an additional API call to fetch detailed information.', async () => {
    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router} />);
    const card = (await screen.findAllByTestId('card'))[0];
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
    expect(card).toMatchSnapshot();

    const mockedUseSearchByValueMutation = vi.spyOn(
      mockSearchCards,
      'useSearchByValueMutation'
    );

    fireEvent.click(card);

    expect(mockedUseSearchByValueMutation).toHaveBeenCalled();
  });
});
