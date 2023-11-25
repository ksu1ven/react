import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import SelectLimit from '../components/Select';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Tests for the Select component', () => {
  it('Value changes correctly', async () => {
    mockRouter.push('/?limit=10');
    render(<SelectLimit pageSize={Number(mockRouter.query.limit)} />, {
      wrapper: MemoryRouterProvider,
    });
    const select = screen.getByTestId('select');
    expect(select).toHaveValue('10');
    fireEvent.change(select, { target: { value: '5' } });
    expect(mockRouter.query).toEqual({ limit: '5' });
    cleanup();
    const limit = render(
      <SelectLimit pageSize={Number(mockRouter.query.limit)} />,
      {
        wrapper: MemoryRouterProvider,
      }
    );
    expect(screen.getByTestId('select')).toHaveValue('5');
    expect(limit.baseElement).toMatchSnapshot();
  });
});
