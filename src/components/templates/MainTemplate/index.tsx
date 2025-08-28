import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface MainTemplateProps {
	children: ReactNode;
	title?: string;
	showBackButton?: boolean;
}

const MainTemplate: FC<MainTemplateProps> = ({
	children,
	title = 'Frontend Coding Challenge',
	showBackButton = false,
}) => {
  const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-4 py-8">
				<header className="text-center mb-8">
					{showBackButton && (
						<div className="flex justify-start mb-4">
							<Button variant="secondary" size="small" onClick={() => navigate(-1)}>
								<FontAwesomeIcon className="mr-1" icon={faArrowLeft} />
								Back
							</Button>
						</div>
					)}
					<Text variant="h1" className="mb-2">
						{title}
					</Text>
				</header>
				<main className="flex justify-center">{children}</main>
			</div>
		</div>
	);
};

export default MainTemplate;
