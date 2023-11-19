import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import SearchPage from '../components/SearchPage/SearchPage';
import {
  createMemoryRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

describe('Tests for the Pagination component', () => {
  it('The component updates URL query parameter when page changes', async () => {
    const routes = createRoutesFromElements(
      <Route
        path="/"
        element={
          <Provider store={store}>
            <SearchPage />
          </Provider>
        }
      ></Route>
    );
    const router = createMemoryRouter(routes);
    render(<RouterProvider router={router} />);
    expect(router.state.location.search).toBe('');
    expect(await screen.findByTestId('pagination')).toBeInTheDocument();
    fireEvent.click(screen.getByText('3'));
    expect(await screen.findByTestId('page-3-button')).toHaveClass(
      'w-14 h-14 bg-lime-300 p-3 rounded-full text-white font-extrabold'
    );
    expect(screen.getByTestId('pagination')).toMatchSnapshot();
    expect(router.state.location.search).toBe('?page=3');
    fireEvent.click(await screen.findByText('>'));
    expect(router.state.location.search).toBe('?page=4');
    fireEvent.click(await screen.findByText('...'));
    expect(router.state.location.search).toBe('?page=7');
    expect(await screen.findByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('page-1-button')).toHaveTextContent('5');
    expect(screen.getByTestId('page-2-button')).toHaveTextContent('6');
    expect(screen.getByTestId('page-3-button')).toHaveTextContent('7');
    fireEvent.click(await screen.findByTestId('last-page-button'));
    expect(router.state.location.search).toBe('?page=20');
  });
});
