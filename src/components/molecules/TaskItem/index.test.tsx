import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskItem from './index';

const deleteTask = vi.fn();
vi.mock('../../../hooks/useTasks', () => ({
  useTasks: () => ({
    deleteTask,
  }),
}));

vi.mock('../../../utils/date', () => ({
  formatDate: (d: any) => (typeof d === 'string' ? d : '2020-01-01'),
}));

describe('TaskItem', () => {
  const task = {
    id: 't1',
    description: 'Do something',
    createdAt: '2020-01-01',
  } as any;

  it('renders description and formatted date', () => {
    render(<TaskItem task={task} />);
    expect(screen.getByText('Do something')).toBeInTheDocument();
    expect(screen.getByText(/Created: 2020-01-01/)).toBeInTheDocument();
  });

  it('calls deleteTask on delete click', async () => {
    const user = userEvent.setup();
    render(<TaskItem task={task} />);
    const btn = screen.getByRole('button', { name: /delete/i });
    await user.click(btn);
    expect(deleteTask).toHaveBeenCalledWith('t1');
  });
});


