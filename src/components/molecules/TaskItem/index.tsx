import type { FC } from 'react';
import type { Task } from '../../../types/task';
import { useTasks } from '../../../hooks/useTasks';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import { formatDate } from '../../../utils/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface TaskItemProps {
	task: Task;
}

const TaskItem: FC<TaskItemProps> = ({ task }) => {
	const { deleteTask } = useTasks();
	return (
	<div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
		<div className="flex-1">
			<Text variant="body" className="font-medium">
				{task.description}
			</Text>
			<Text variant="caption" className="text-gray-500">
				Created: {formatDate(task.createdAt)}
			</Text>
		</div>
		<Button
			variant="danger"
			size="small"
			onClick={() => deleteTask(task.id)}
			className="ml-4"
		>
			Delete
			<FontAwesomeIcon className="ml-1" icon={faTrash} />
		</Button>
	</div>
)};

export default TaskItem;
