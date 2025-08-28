import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';

interface TaskFormProps {
  onSubmit: (description: string) => void;
  onCancel: () => void;
}

const TaskForm: FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setError('Description cannot be empty');
      return;
    }

    setError('');
    onSubmit(description.trim());
    setDescription('');
  };

  return (
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
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
