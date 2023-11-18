import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import SearchForm from '../components/SearchPage/SearchForm';

describe('Tests for the Search component', () => {
  it('Clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <Provider store={store}>
        <SearchForm params={new URLSearchParams()} setParams={vi.fn()} />
      </Provider>
    );
    expect(localStorage.getItem('searchValue')).toBe(null);
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'hotdog' },
    });
    fireEvent.submit(screen.getByTestId('search-form'));
    expect(localStorage.getItem('searchValue')).toBe('hotdog');
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'cat' },
    });
    fireEvent.submit(screen.getByTestId('search-form'));
    expect(screen.getByTestId('search-form')).toMatchSnapshot();
    expect(localStorage.getItem('searchValue')).toBe('cat');
  });

  it('The component retrieves the value from the local storage upon mounting.', async () => {
    const localStorageValue = localStorage.getItem('searchValue');
    render(
      <Provider store={store}>
        <SearchForm params={new URLSearchParams()} setParams={vi.fn()} />
      </Provider>
    );
    expect(screen.getByTestId('search-form')).toMatchSnapshot();
    expect(screen.getByTestId('search-input')).toHaveValue(localStorageValue);
  });
});
