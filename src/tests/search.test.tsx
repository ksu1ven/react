import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchForm from '../components/SearchPage/SearchForm';
import { SearchValueContext } from '../components/SearchPage/Contexts';
import SearchPage from '../components/SearchPage/SearchPage';

describe('Tests for the Search component', () => {
  it('clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <SearchValueContext.Provider value={''}>
        <SearchForm
          setSearchValue={vi.fn()}
          pageNumber={0}
          setPageNumber={vi.fn()}
          setPaginationButtonsValue={vi.fn()}
          params={new URLSearchParams('')}
          setParams={vi.fn()}
        />
      </SearchValueContext.Provider>
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
    expect(localStorage.getItem('searchValue')).toBe('cat');
  });

  it('The component retrieves the value from the local storage upon mounting.', async () => {
    const localStorageValue = localStorage.getItem('searchValue');
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('search-input')).toHaveValue(localStorageValue);
  });
});
