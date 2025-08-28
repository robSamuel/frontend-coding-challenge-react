import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import MainTemplate from '../../templates/MainTemplate';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import { ROUTES } from '../../../constants/routes';

const HomePage: FC = () => {
  const navigate = useNavigate();

  return (
    <MainTemplate title="Frontend Coding Challenge">
      <div className="flex flex-col space-y-4 w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <Text variant="h2" className="mb-4">
            Welcome to the Challenge
          </Text>
          <Text variant="body" className="text-gray-600">
            Select one option to start
          </Text>
        </div>
        
        <Button
          variant="primary"
          size="large"
          onClick={() => navigate(ROUTES.tasks)}
          className="w-full flex flex-col items-center justify-center p-6 space-y-2"
        >
          <Text variant="h3" className="text-center">
            Tasks
          </Text>
          <Text variant="body" className="text-center">
            Manage your tasks
          </Text>
        </Button>
        
        <Button
          variant="secondary"
          size="large"
          onClick={() => navigate(ROUTES.list)}
          className="w-full flex flex-col items-center justify-center p-6 space-y-2"
        >
          <Text variant="h3" className="text-center">
            List
          </Text>
          <Text variant="body" className="text-center">
            See remote data
          </Text>
        </Button>
      </div>
    </MainTemplate>
  );
};

export default HomePage;
