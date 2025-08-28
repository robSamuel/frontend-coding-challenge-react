import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './index';

describe('Input', () => {
  it('renders label when provided', () => {
    render(<Input value="" onChange={() => {}} label="Name" />);
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('calls onChange with new value', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} placeholder="Type here" />);
    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'Hola');
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith('H');
  });

  it('shows error text when provided', () => {
    render(<Input value="a" onChange={() => {}} error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('disabled prevents input', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    await user.click(input);
    await user.keyboard('a');
    expect(handleChange).not.toHaveBeenCalled();
  });
});


