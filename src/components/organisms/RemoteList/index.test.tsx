import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RemoteList from './index';

const mockRetry = vi.fn();
const mockUseList = vi.fn();

vi.mock('../../../hooks/useList', () => ({
  useList: () => mockUseList(),
}));

describe('RemoteList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state', () => {
    mockUseList.mockReturnValue({
      items: [],
      loading: true,
      error: null,
      retry: mockRetry,
    });

    render(<RemoteList />);
    expect(screen.getByText(/loading elements/i)).toBeInTheDocument();
  });

  it('shows error state with retry button', async () => {
    const user = userEvent.setup();
    mockUseList.mockReturnValue({
      items: [],
      loading: false,
      error: 'Network error',
      retry: mockRetry,
    });

    render(<RemoteList />);
    expect(screen.getByText(/error fetching elements/i)).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
    
    const retryBtn = screen.getByRole('button', { name: /try again/i });
    await user.click(retryBtn);
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it('shows empty state when no items', () => {
    mockUseList.mockReturnValue({
      items: [],
      loading: false,
      error: null,
      retry: mockRetry,
    });

    render(<RemoteList />);
    expect(screen.getByText(/no elements found/i)).toBeInTheDocument();
    expect(screen.getByText(/0 fetched elements/i)).toBeInTheDocument();
  });

  it('renders list of items', () => {
    const mockItems = [
      { id: '1', name: 'Item 1', avatar: 'http://test.com/1.jpg', createdAt: '2020-01-01' },
      { id: '2', name: 'Item 2', avatar: 'http://test.com/2.jpg', createdAt: '2020-01-02' },
    ];

    mockUseList.mockReturnValue({
      items: mockItems,
      loading: false,
      error: null,
      retry: mockRetry,
    });

    render(<RemoteList />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText(/2 fetched elements/i)).toBeInTheDocument();
  });
});
