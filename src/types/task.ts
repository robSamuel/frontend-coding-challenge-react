export interface Task {
  id: string;
  description: string;
  createdAt: Date;
}

export interface CreateTaskRequest {
  description: string;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}
