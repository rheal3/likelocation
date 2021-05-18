import { render, screen } from '@testing-library/react';
import HomePage from './Page';

test('HomePage is displayed to screen', () => {
  render(<HomePage />);

  const home = screen.getByText(/Home/i);
  
  expect(home).toBeInTheDocument();
});