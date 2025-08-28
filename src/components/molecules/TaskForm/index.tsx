import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import Modal from '../../atoms/Modal';
import { useTasks } from '../../../hooks/useTasks';

interface TaskFormProps {
  isModalOpen: boolean;
  toggleOpenModal: () => void;
}

const TaskForm: FC<TaskFormProps> = ({ isModalOpen, toggleOpenModal }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { createTask } = useTasks();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setError('Description cannot be empty');
      return;
    }

    setError('');
    createTask({description: description.trim()});
    toggleOpenModal();
    setDescription('');
  };

  return (
    <Modal
				isOpen={isModalOpen}
				onClose={toggleOpenModal}
				title="Create New Task"
			>
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={description}
        onChange={setDescription}
        placeholder="Task description"
        label="Description"
        error={error}
      />
      
      <div className="flex space-x-3">
        <Button
          type="submit"
          variant="primary"
          disabled={!description.trim()}
          className="flex-1"
        >
          Create Task
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={toggleOpenModal}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
    </Modal>
  );
};

export default TaskForm;
