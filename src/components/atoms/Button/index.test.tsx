import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './index';

describe('Button', () => {
  it('renders content', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('calls onClick on click', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button', { name: /click/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    await user.click(screen.getByRole('button', { name: /disabled/i }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies classes based on variant and size', () => {
    const { rerender } = render(
      <Button variant="primary" size="small">
        A
      </Button>,
    );
    const btn = screen.getByRole('button', { name: 'A' });
    expect(btn.className).toMatch(/bg-blue-600/);
    expect(btn.className).toMatch(/px-3/);

    rerender(
      <Button variant="secondary" size="large">
        B
      </Button>,
    );
    const btn2 = screen.getByRole('button', { name: 'B' });
    expect(btn2.className).toMatch(/bg-gray-200/);
    expect(btn2.className).toMatch(/px-6/);
  });
});


