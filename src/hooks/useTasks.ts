import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { addTask, removeTask } from '../store/tasksSlice';
import type { CreateTaskRequest } from '../types/task';

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector(state => state.tasks);

  const createTask = (taskData: CreateTaskRequest) => {
    dispatch(addTask(taskData));
  };

  const deleteTask = (taskId: string) => {
    dispatch(removeTask(taskId));
  };

  const clearTasksStorage = () => {
    try {
      localStorage.removeItem('frontend-challenge-state');
      console.log('Tasks storage cleared');
    } catch (error) {
      console.warn('Error clearing tasks storage:', error);
    }
  };

  const getTasks = () => tasks;

  const getTaskById = (taskId: string) => {
    return tasks.find(task => task.id === taskId);
  };

  const getTasksCount = () => tasks.length;

  const hasTasks = () => tasks.length > 0;

  return {
    // State
    tasks,
    loading,
    error,
    
    // Actions
    createTask,
    deleteTask,
    clearTasksStorage,
    
    // Getters
    getTasks,
    getTaskById,
    getTasksCount,
    hasTasks,
  };
};
