import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import { persistMiddleware, loadPersistedState } from '../utils/persistMiddleware';
import type { TaskState } from '../types/task';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: loadPersistedState() as { tasks: TaskState } | undefined,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
