import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

// Sometimes this test works, sometimes no - due to "location". Please, try again, maybe one this test - not all ones

describe('Tests for the Pagination component', () => {
  it('The component updates URL query parameter when page changes', async () => {
    render(<App />);
    expect(window.location.search).toBe('');
    expect(await screen.findByTestId('pagination')).toBeInTheDocument();
    fireEvent.click(screen.getByText('3'));
    expect(await screen.findByTestId('page-3-button')).toHaveClass(
      'w-14 h-14 bg-lime-300 p-3 rounded-full text-white font-extrabold'
    );
    expect(window.location.search).toBe('?page=3');
    fireEvent.click(screen.getByText('>'));
    await screen.findByTestId('pagination');
    expect(window.location.search).toBe('?page=4');
  });
});
