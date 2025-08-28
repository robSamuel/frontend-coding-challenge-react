import type { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import HomePage from './components/pages/HomePage';
import TasksPage from './components/pages/TasksPage';

const App: FC = () => (
	<Provider store={store}>
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/tasks" element={<TasksPage />} />
				<Route
					path="/list"
					element={
						<div className="min-h-screen bg-gray-50 flex items-center justify-center">
							<div className="text-center">
								<h2 className="text-2xl font-bold mb-4">List</h2>
								<p className="text-gray-600 mb-4">
									This functionality will be implemented in the next Feature
								</p>
								<button
									type="button"
									onClick={() => console.log('onNavigateToHome')}
									className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
								>
									Back To Home Page
								</button>
							</div>
						</div>
					}
				/>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</div>
	</Provider>
);

export default App;
