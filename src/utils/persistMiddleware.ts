import type { Middleware } from '@reduxjs/toolkit';
import type { Task } from '../types/task';

const STORAGE_KEY = 'frontend-challenge-state';

export const persistMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Persist just the tasks state
  const stateToPersist = {
    tasks: store.getState().tasks,
  };
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
  } catch (error) {
    console.warn('Error saving state to localStorage:', error);
  }
  
  return result;
};

// Load persisted state
export const loadPersistedState = () => {
  try {
    const persistedState = localStorage.getItem(STORAGE_KEY);
    if (persistedState) {
      const parsed = JSON.parse(persistedState);
      
      // Convert the string date to Date objects
      if (parsed?.tasks?.tasks) {
        parsed.tasks.tasks = parsed.tasks.tasks.map((task: Task) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }));
      }
      
      return parsed;
    }
  } catch (error) {
    console.warn('Error loading persisted state:', error);
  }
  return undefined;
};
