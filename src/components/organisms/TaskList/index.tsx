import { useState } from 'react';
import type { FC } from 'react';
import {useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector'
import { addTask, removeTask } from '../../../store/tasksSlice';
import TaskItem from '../../molecules/TaskItem';
import Button from '../../atoms/Button';
import Modal from '../../atoms/Modal';
import TaskForm from '../../molecules/TaskForm';
import Text from '../../atoms/Text';

const TaskList: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();

  const handleAddTask = (description: string) => {
    dispatch(addTask({ description }));
    setIsModalOpen(false);
  };

  const handleDeleteTask = (id: string) => {
    dispatch(removeTask(id));
  };

  const toggleOpenModal = () => setIsModalOpen(prevIsModalOpen => !prevIsModalOpen)

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Text variant="h2">My tasks</Text>
        <Button
          variant="primary"
          onClick={toggleOpenModal}
        >
          Add New Task
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <Text variant="body" className="text-gray-500">
              No tasks created yet. Create your first task!
            </Text>
          </div>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={toggleOpenModal}
        title="Create New Task"
      >
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={toggleOpenModal}
        />
      </Modal>
    </div>
  );
};

export default TaskList;
