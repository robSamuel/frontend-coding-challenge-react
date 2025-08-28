import type { FC } from 'react';

import MainTemplate from '../../templates/MainTemplate';
import TaskList from '../../organisms/TaskList';

const TasksPage: FC = () => {
  return (
    <MainTemplate
      title="Tasks Management"
      showBackButton
    >
      <TaskList />
    </MainTemplate>
  );
};

export default TasksPage;
