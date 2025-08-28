import { render, screen, fireEvent } from '@testing-library/react';
import ListItem from './index';

vi.mock('../../../utils/date', () => ({
  formatDate: () => '2020-01-01',
}));

vi.mock('../../../utils/url', () => ({
  isValidUrl: (url: string) => url.startsWith('http'),
}));

describe('ListItem', () => {
  const baseItem = {
    id: '1',
    name: 'John Doe',
    avatar: 'http://avatar.test/pic.jpg',
    createdAt: new Date('2020-01-01T00:00:00Z').toISOString(),
  };

  it('renders name and formatted date', () => {
    render(<ListItem item={baseItem as any} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/Created: 2020-01-01/)).toBeInTheDocument();
  });

  it('shows avatar image when URL is valid', () => {
    render(<ListItem item={baseItem as any} />);
    const img = screen.getByRole('img', { name: /avatar de john doe/i });
    expect(img).toBeInTheDocument();
  });

  it('hides image on error event', () => {
    const { queryByRole } = render(<ListItem item={baseItem as any} />);
    const img = screen.getByRole('img', { name: /avatar de john doe/i });
    fireEvent.error(img);
    expect(queryByRole('img')).toBeNull();
  });

  it('does not render image when URL is invalid', () => {
    const item = { ...baseItem, avatar: 'invalid-url' };
    const { queryByRole } = render(<ListItem item={item as any} />);
    expect(queryByRole('img')).toBeNull();
  });
});


