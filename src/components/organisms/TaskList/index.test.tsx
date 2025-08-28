import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskList from './index';

const mockClearTasksStorage = vi.fn();
const mockUseTasks = vi.fn();

vi.mock('../../../hooks/useTasks', () => ({
  useTasks: () => mockUseTasks(),
}));

// Mock window.location.reload
Object.defineProperty(window, 'location', {
  value: { reload: vi.fn() },
  writable: true,
});

describe('TaskList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows empty state when no tasks', () => {
    mockUseTasks.mockReturnValue({
      tasks: [],
      clearTasksStorage: mockClearTasksStorage,
    });

    render(<TaskList />);
    expect(screen.getByText(/no tasks created yet/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  });

  it('renders list of tasks', () => {
    const mockTasks = [
      { id: '1', description: 'Task 1', createdAt: new Date('2020-01-01T00:00:00Z') },
      { id: '2', description: 'Task 2', createdAt: new Date('2020-01-02T00:00:00Z') },
    ];

    mockUseTasks.mockReturnValue({
      tasks: mockTasks,
      clearTasksStorage: mockClearTasksStorage,
    });

    render(<TaskList />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('shows clear button when tasks exist', () => {
    const mockTasks = [{ id: '1', description: 'Task 1', createdAt: new Date('2020-01-01T00:00:00Z') }];

    mockUseTasks.mockReturnValue({
      tasks: mockTasks,
      clearTasksStorage: mockClearTasksStorage,
    });

    render(<TaskList />);
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('opens modal when add button is clicked', async () => {
    const user = userEvent.setup();
    mockUseTasks.mockReturnValue({
      tasks: [],
      clearTasksStorage: mockClearTasksStorage,
    });

    render(<TaskList />);
    const addBtn = screen.getByRole('button', { name: /add/i });
    await user.click(addBtn);
    
    expect(screen.getByText(/create new task/i)).toBeInTheDocument();
  });

  it('calls clearTasksStorage and reloads page on clear', async () => {
    const user = userEvent.setup();
    const mockTasks = [{ id: '1', description: 'Task 1', createdAt: new Date('2020-01-01T00:00:00Z') }];

    mockUseTasks.mockReturnValue({
      tasks: mockTasks,
      clearTasksStorage: mockClearTasksStorage,
    });

    render(<TaskList />);
    const clearBtn = screen.getByRole('button', { name: /clear/i });
    await user.click(clearBtn);

    expect(mockClearTasksStorage).toHaveBeenCalledTimes(1);
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
