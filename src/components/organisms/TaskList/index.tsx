import { useState } from 'react';
import type { FC } from 'react';
import { useTasks } from '../../../hooks/useTasks';
import TaskItem from '../../molecules/TaskItem';
import Button from '../../atoms/Button';
import TaskForm from '../../molecules/TaskForm';
import Text from '../../atoms/Text';
import type { Task } from '../../../types/task';

const TaskList: FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { tasks, clearTasksStorage } = useTasks();

	const handleClearStorage = () => {
		clearTasksStorage();

		window.location.reload();
	};

	const toggleOpenModal = () =>
		setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);

	const renderTasks = () => {
		if (tasks.length === 0) {
			return (
				<div className="text-center py-8">
					<Text variant="body" className="text-gray-500">
						No tasks created yet. Create your first task!
					</Text>
				</div>
			);
		}

		return tasks.map((task: Task) => <TaskItem key={task.id} task={task} />);
	};

	return (
		<div className="w-full max-w-2xl mx-auto">
			<div className="flex items-center justify-between mb-6">
				<Text variant="h2">My tasks</Text>
				<div className="flex space-x-2">
					<Button variant="primary" onClick={toggleOpenModal}>
						Add New Task
					</Button>
					{tasks.length > 0 && (
						<Button variant="danger" size="small" onClick={handleClearStorage}>
							Clear
						</Button>
					)}
				</div>
			</div>

			<div className="space-y-4">{renderTasks()}</div>

			{isModalOpen && (
				<TaskForm
					isModalOpen={isModalOpen}
					toggleOpenModal={toggleOpenModal}
				/>
			)}
		</div>
	);
};

export default TaskList;
