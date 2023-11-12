import { beforeAll, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import App from '../App';

describe('Tests for the Detailed Card component', () => {
  beforeAll(async () => {
    //Click card to get search params - ?details=testCard-0 -  for thesee three tests"
    render(<App />);
    await waitFor(() => {
      const card = screen.getAllByTestId('card')[0];
      fireEvent.click(card);
      screen.getByTestId('details');
      cleanup();
    });
  });

  it('Loading indicator is displayed while fetching data', async () => {
    expect(location.search).toBe('?details=testCard-0');
    render(<App />);
    expect(screen.getByTestId('details')).toContainHTML(
      '<span class="loader" data-testid="loader" />'
    );
  });

  it('Detailed card component correctly displays the detailed card data;', async () => {
    render(<App />);
    expect(location.search).toBe('?details=testCard-0');
    const details = await screen.findByTestId('details');
    expect(details).toMatchSnapshot();
    expect(screen.getByTestId('details')).toBeInTheDocument();
    expect(await screen.findByTestId('details-h1')).toHaveTextContent(
      'postRequestCardName'
    );
    expect(screen.getByText('EarthAnimal: No')).toBeInTheDocument();
    expect(screen.getByText('Avian: Yes')).toBeInTheDocument();
  });

  it('Clicking the close button hides the component.', async () => {
    render(<App />);
    expect(location.search).toBe('?details=testCard-0');
    expect(await screen.findByTestId('details')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('cross'));
    const details = await screen.findByTestId('details');
    expect(details).toMatchSnapshot();
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
    expect(screen.queryByTestId('details-h1')).not.toBeInTheDocument();
    expect(screen.queryByText('EarthAnimal: No')).not.toBeInTheDocument();
    expect(screen.queryByText('Avian: Yes')).not.toBeInTheDocument();
  });
});
