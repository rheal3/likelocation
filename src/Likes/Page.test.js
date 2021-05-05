import { render, screen } from '@testing-library/react';
import LikesPage from './Page'

test('empty state should show when likes are empty', () => {
    const rendered = render(<LikesPage />);
    console.log(rendered)
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
})