import React, { type FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Loading from './components/atoms/Loading';
import { ROUTES } from './constants/routes';

const HomePage = React.lazy(() => import('./components/pages/HomePage'));
const TasksPage = React.lazy(() => import('./components/pages/TasksPage'));
const ListPage = React.lazy(() => import('./components/pages/ListPage'));

const App: FC = () => (
	<Provider store={store}>
		<div className="App">
			<Suspense fallback={<Loading size="large" text="Loading page..." />}>
				<Routes>
					<Route path={ROUTES.home} element={<HomePage />} />
					<Route path={ROUTES.tasks} element={<TasksPage />} />
					<Route path={ROUTES.list} element={<ListPage />} />
					<Route path="*" element={<Navigate to={ROUTES.home} replace />} />
				</Routes>
			</Suspense>
		</div>
	</Provider>
);

export default App;
