import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import SearchForm from '../components/SearchForm';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Tests for the Search component', () => {
  it('Clicking the Search button saves the entered value to the local storage', async () => {
    mockRouter.push('/');
    render(<SearchForm searchValue="" />, {
      wrapper: MemoryRouterProvider,
    });
    expect(localStorage.getItem('search')).toBe(null);
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'hotdog' },
    });
    fireEvent.submit(screen.getByTestId('search-form'));

    expect(mockRouter.asPath).toBe('/?search=hotdog');
    expect(localStorage.getItem('search')).toBe('hotdog');

    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'cat' },
    });
    fireEvent.submit(screen.getByTestId('search-form'));
    expect(screen.getByTestId('search-form')).toMatchSnapshot();

    expect(mockRouter.asPath).toBe('/?search=cat');
    expect(localStorage.getItem('search')).toBe('cat');
  });

  it('The component retrieves the value from the local storage upon mounting.', async () => {
    const localStorageValue = localStorage.getItem('search');
    expect(localStorageValue).toBe('cat');
    mockRouter.push(`/?search=${localStorageValue}`);
    render(
      <SearchForm searchValue={mockRouter.query.search?.toString() || ''} />,
      {
        wrapper: MemoryRouterProvider,
      }
    );

    expect(screen.getByTestId('search-form')).toMatchSnapshot();
    expect(screen.getByTestId('search-input')).toHaveValue(localStorageValue);
  });
});
