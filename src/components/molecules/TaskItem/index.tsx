import type { FC } from 'react';
import type { Task } from '../../../types/task';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import { formatDate } from '../../../utils/date';

interface TaskItemProps {
	task: Task;
	onDelete: (id: string) => void;
}

const TaskItem: FC<TaskItemProps> = ({ task, onDelete }) => (
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
			onClick={() => onDelete(task.id)}
			className="ml-4"
		>
			Delete
		</Button>
	</div>
);

export default TaskItem;
