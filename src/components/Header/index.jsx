import Button from '@mui/material/Button';
import React from 'react';

import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, selectData, selectIsAuth } from '../../redux/slices/auth';
import styles from './Header.module.scss';

export const Header = () => {
	const dispatch = useDispatch();
	const data = useSelector(selectData);
	const isAuth = useSelector(selectIsAuth);
	const navigate = useNavigate();
	const onClickLogout = () => {
		if (window.confirm('Are you sure?')) {
			dispatch(logout());
			navigate('/login');
			localStorage.removeItem('token');
		}
	};

	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link className={styles.logo} to="/home">
						<div>MY BLOG</div>
						<div>{data?.fullName}</div>
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<Link to="/add-post">
									<Button variant="contained">Написать статью</Button>
								</Link>
								<Button
									onClick={onClickLogout}
									variant="contained"
									color="error"
								>
									Выйти
								</Button>
							</>
						) : (
							<>
								<Link to="/login">
									<Button variant="outlined">Войти</Button>
								</Link>
								<Link to="/register">
									<Button variant="contained">Создать аккаунт</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
