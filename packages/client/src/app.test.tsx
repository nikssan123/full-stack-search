import { expect, test, vi, describe, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as fetchUtils from './utils/search';

import App from './App';
import Home from "./pages/Home";
import { DEBOUNCE_DELAY, mockSearchResponse } from './constants';


test('renders search input', () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Search accommodation...');
  expect(input).toBeInTheDocument();
});



describe('Search input should', () => {
  beforeEach(async () => {
    render(<Home />);

    vi.spyOn(fetchUtils, 'fetchAndFilter').mockResolvedValue(mockSearchResponse);
  });

  test('fetch data on input change', async () => {
    const input = screen.getByRole('textbox');
    const user = userEvent.setup();

    await user.type(input, "uni");

    await new Promise((res) => setTimeout(res, DEBOUNCE_DELAY));

    expect(fetchUtils.fetchAndFilter).toBeCalledWith("uni");
  });

  test("displays load more buttons", async () => {
    const input = screen.getByRole('textbox');
    const user = userEvent.setup();

    await user.type(input, "uni");

    await new Promise((res) => setTimeout(res, DEBOUNCE_DELAY));

    const hotelsLoadMore = screen.queryByRole('button', { name: 'Load More Hotels' });
    const countriesLoadMore = screen.queryByRole('button', { name: 'Load More Countries' });
    const cityLoadMore = screen.getByRole('button', { name: 'Load More Cities' });

    expect(hotelsLoadMore).not.toBeInTheDocument();
    expect(countriesLoadMore).not.toBeInTheDocument();
    expect(cityLoadMore).toBeInTheDocument();
  });

  test("displays correct items in the dropdown", async () => {
    const input = screen.getByRole('textbox');
    const user = userEvent.setup();

    await user.type(input, "uni");

    await new Promise((res) => setTimeout(res, DEBOUNCE_DELAY));

    const elements = screen.getAllByRole('link');

    expect(elements).toBeTruthy()

    expect(screen.getByRole('link', { name: 'Hilton New York' })).toHaveAttribute('href', '/hotels/hotel1');
    expect(screen.getByRole('link', { name: 'Marriott London' })).toHaveAttribute('href', '/hotels/hotel2');
    expect(screen.getByRole('link', { name: 'Shangri-La Tokyo' })).toHaveAttribute('href', '/hotels/hotel3');

    expect(screen.getByRole('link', { name: 'USA' })).toHaveAttribute('href', '/countries/country1');
    expect(screen.getByRole('link', { name: 'UK' })).toHaveAttribute('href', '/countries/country2');
    expect(screen.getByRole('link', { name: 'Japan' })).toHaveAttribute('href', '/countries/country3');

    expect(screen.getByRole('link', { name: 'New York' })).toHaveAttribute('href', '/cities/city1');
    expect(screen.getByRole('link', { name: 'London' })).toHaveAttribute('href', '/cities/city2');
    expect(screen.getByRole('link', { name: 'Tokyo' })).toHaveAttribute('href', '/cities/city3');
  });
})



