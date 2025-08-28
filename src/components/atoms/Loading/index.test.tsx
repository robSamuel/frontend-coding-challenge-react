import { render, screen } from '@testing-library/react';
import Loading from './index';

describe('Loading', () => {
  it('shows default text', () => {
    render(<Loading />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('allows custom text', () => {
    render(<Loading text="Loading data" />);
    expect(screen.getByText('Loading data')).toBeInTheDocument();
  });

  it('hides text when empty', () => {
    const { container } = render(<Loading text="" />);
    expect(container.querySelector('p')).toBeNull();
  });
});


