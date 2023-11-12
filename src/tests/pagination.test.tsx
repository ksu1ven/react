import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';

// I split this test into 3 ones because of location search params. In one test they are sometimes right, sometimes ''

describe('Tests for the Pagination component', () => {
  it('The component updates URL query parameter when page changes', async () => {
    render(<App />);
    expect(window.location.search).toBe('');
    expect(await screen.findByTestId('pagination')).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.click(screen.getByText('3'));
      expect(screen.getByTestId('page-3-button')).toHaveClass(
        'w-14 h-14 bg-lime-300 p-3 rounded-full text-white font-extrabold'
      );
    });
  });

  it('The component updates URL query parameter when page changes - click next page', async () => {
    expect(window.location.search).toBe('?page=3');
    render(<App />);
    expect(await screen.findByTestId('pagination')).toBeInTheDocument();
    fireEvent.click(screen.getByText('>'));
  });

  it('The component updates URL query parameter when page changes - click next 3 pages', async () => {
    expect(window.location.search).toBe('?page=4');
    render(<App />);
    expect(await screen.findByTestId('pagination')).toBeInTheDocument();
    fireEvent.click(screen.getByText('...'));
  });

  it('The component updates URL query parameter when page changes - click last page', async () => {
    expect(window.location.search).toBe('?page=7');
    render(<App />);
    expect(await screen.findByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('page-1-button')).toHaveTextContent('5');
    expect(screen.getByTestId('page-2-button')).toHaveTextContent('6');
    expect(screen.getByTestId('page-3-button')).toHaveTextContent('7');
    fireEvent.click(screen.getByTestId('last-page-button'));
  });

  it('The component updates URL query parameter when page changes - step 4', async () => {
    expect(window.location.search).toBe('?page=20');
  });
});
