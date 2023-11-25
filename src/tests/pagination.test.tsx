import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import Pagination from '../components/Pagination';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Tests for the Pagination component', () => {
  it('The component updates URL query parameter when page changes', async () => {
    mockRouter.push('/');
    render(
      <Pagination
        pageNumber={(Number(mockRouter.query.page) - 1) | 0}
        totalPages={200}
        paginationButtonsValue={[1, 2, 3]}
      />,
      {
        wrapper: MemoryRouterProvider,
      }
    );
    expect(screen.getByTestId('pagination')).toMatchSnapshot();
    expect(await screen.findByTestId('pagination')).toBeInTheDocument();
    fireEvent.click(screen.getByText('3'));

    expect(mockRouter.asPath).toBe('/?page=3');
    cleanup();

    render(
      <Pagination
        pageNumber={(Number(mockRouter.query.page) - 1) | 0}
        totalPages={200}
        paginationButtonsValue={[3, 4, 5]}
      />,
      {
        wrapper: MemoryRouterProvider,
      }
    );
    expect(await screen.findByTestId('page-1-button')).toHaveClass(
      'w-14 h-14 bg-lime-300 p-3 rounded-full text-white font-extrabold'
    );
    fireEvent.click(await screen.findByText('>'));
    expect(mockRouter.asPath).toBe('/?page=4');

    cleanup();

    render(
      <Pagination
        pageNumber={(Number(mockRouter.query.page) - 1) | 0}
        totalPages={200}
        paginationButtonsValue={[3, 4, 5]}
      />,
      {
        wrapper: MemoryRouterProvider,
      }
    );
    fireEvent.click(await screen.findByText('...'));
    expect(mockRouter.asPath).toBe('/?page=8');

    cleanup();

    render(
      <Pagination
        pageNumber={(Number(mockRouter.query.page) - 1) | 0}
        totalPages={200}
        paginationButtonsValue={[8, 9, 10]}
      />,
      {
        wrapper: MemoryRouterProvider,
      }
    );
    expect(screen.getByTestId('page-1-button')).toHaveTextContent('8');
    expect(screen.getByTestId('page-2-button')).toHaveTextContent('9');
    expect(screen.getByTestId('page-3-button')).toHaveTextContent('10');
    fireEvent.click(await screen.findByTestId('last-page-button'));
    expect(mockRouter.asPath).toBe('/?page=200');
  });
});
