import Container from '@mui/material/Container';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { fetchAuthMe } from './redux/actions/action.creators';
import { AppDispatch } from './redux/store';
import { routes } from './routes/routes';

function App() {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchAuthMe());
	}, []);
	return (
		<>
			<Header />
			<Container maxWidth="lg">
				<Routes>
					{routes.map(route => (
						<Route
							key={route.path}
							path={route.path}
							element={<route.component />}
						/>
					))}
				</Routes>
			</Container>
		</>
	);
}

export default App;
