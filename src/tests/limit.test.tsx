import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import SelectLimit from '../components/SearchPage/Select';

describe('Tests for the Select component', () => {
  it('Value changes correctly', async () => {
    const limit = render(
      <Provider store={store}>
        <SelectLimit params={new URLSearchParams()} setParams={vi.fn()} />
      </Provider>
    );
    const select = screen.getByTestId('select');
    expect(select).toHaveValue('10');
    fireEvent.change(select, { target: { value: '5' } });
    expect(select).toHaveValue('5');
    expect(limit.baseElement).toMatchSnapshot();
  });
});
