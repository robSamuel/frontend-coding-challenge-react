import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from './index';

vi.mock('../../../hooks/useTasks', () => ({
  useTasks: () => ({
    createTask: vi.fn(),
  }),
}));

describe('TaskForm', () => {
  const setup = () => {
    const props = {
      isModalOpen: true,
      toggleOpenModal: vi.fn(),
    };
    const utils = render(<TaskForm {...props} />);
    return { ...utils, props };
  };

  it('disables submit when description is empty', () => {
    setup();
    const submit = screen.getByRole('button', { name: /create task/i });
    expect(submit).toBeDisabled();
  });

  it('does not show error when clicking disabled submit', async () => {
    const user = userEvent.setup();
    setup();
    const submit = screen.getByRole('button', { name: /create task/i });
    await user.click(submit);
    expect(screen.queryByText(/description cannot be empty/i)).not.toBeInTheDocument();
  });

  it('creates task and closes modal on valid submit', async () => {
    const user = userEvent.setup();
    const { props } = setup();
    const input = screen.getByLabelText(/description/i);
    const submit = screen.getByRole('button', { name: /create task/i });

    await user.type(input, 'New task');
    expect(submit).toBeEnabled();
    await user.click(submit);

    expect(props.toggleOpenModal).toHaveBeenCalled();
  });

  it('cancels and closes modal on cancel click', async () => {
    const user = userEvent.setup();
    const { props } = setup();
    const cancel = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancel);
    expect(props.toggleOpenModal).toHaveBeenCalled();
  });
});


