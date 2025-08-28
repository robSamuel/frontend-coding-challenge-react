import type { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import HomePage from './components/pages/HomePage';
import TasksPage from './components/pages/TasksPage';
import ListPage from './components/pages/ListPage';

const App: FC = () => (
	<Provider store={store}>
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/tasks" element={<TasksPage />} />
				<Route path="/list" element={<ListPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</div>
	</Provider>
);

export default App;
