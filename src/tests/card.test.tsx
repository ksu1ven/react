import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  LoaderFunction,
} from 'react-router-dom';
import Details, { loader } from '../components/SearchPage/Details';
import App from '../App';
import SearchPage from '../components/SearchPage/SearchPage';

describe('Tests for the Card component', () => {
  it('The card component renders the relevant card data', async () => {
    render(<App />);
    const card = (await screen.findAllByTestId('card'))[0];
    expect(card).toMatchSnapshot();
    expect(screen.getAllByAltText('animal picture')[0]).toBeTruthy();
    expect(screen.getAllByRole('heading')[3]).toHaveTextContent('testCard-3');
    expect(screen.queryByText('Some-text')).toBeFalsy();
    expect(screen.getAllByText('Description: avian')[0]).toBeTruthy();
  });

  it('Clicking on a card opens a detailed card component', async () => {
    const routes = createRoutesFromElements(
      <>
        <Route path="/" element={<SearchPage />}>
          <Route index element={<Details />} loader={loader} />
        </Route>
      </>
    );
    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router} />);
    const card = (await screen.findAllByTestId('card'))[0];
    expect(card).toMatchSnapshot();
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
    fireEvent.click(card);
    const details = await screen.findByTestId('details');
    expect(details).toMatchSnapshot();
    expect(screen.getByTestId('details')).toBeInTheDocument();
  });

  it('Clicking triggers an additional API call to fetch detailed information.', async () => {
    const mockObj = {
      loaderSpy: loader,
    };
    const spy: unknown = vi.spyOn(mockObj, 'loaderSpy').mockResolvedValue({
      avian: true,
      canine: true,
      earthAnimal: true,
      earthInsect: true,
      feline: true,
      name: 'Cat',
      uid: '1',
    });
    const routes = createRoutesFromElements(
      <>
        <Route path="/" element={<SearchPage />}>
          <Route index element={<Details />} loader={spy as LoaderFunction} />
        </Route>
      </>
    );
    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router} />);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveReturnedWith(
      await Promise.resolve({
        avian: true,
        canine: true,
        earthAnimal: true,
        earthInsect: true,
        feline: true,
        name: 'Cat',
        uid: '1',
      })
    );
  });
});
