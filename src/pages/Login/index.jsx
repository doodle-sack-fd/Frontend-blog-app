import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchUserData } from '../../redux/actions/action.creators';
import { selectIsAuth } from '../../redux/slices/auth';
import styles from './Login.module.scss';

export const Login = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: 'test2@mail.ru',
			password: '123456',
		},
		mode: 'onChange',
	});
	const onSubmit = async data => {
		const res = await dispatch(fetchUserData(data));
		if (!res.payload) {
			return alert('Не удалось авторизироваться');
		}

		if ('token' in res.payload) {
			window.localStorage.setItem('token', res.payload.token);
		}
	};

	if (isAuth) {
		return <Navigate to="/home" />;
	}

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h5">
				Вход в аккаунт
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					type="email"
					error={!!errors.email?.message}
					helperText={errors.email?.message}
					{...register('email', { required: 'Укажите почту' })}
					fullWidth
				/>
				<TextField
					className={styles.field}
					label="Пароль"
					type="password"
					error={!!errors.password?.message}
					helperText={errors.password?.message}
					{...register('password', { required: 'Введите пароль' })}
					fullWidth
				/>
				<Button type="submit" size="large" variant="contained" fullWidth>
					Войти
				</Button>
			</form>
		</Paper>
	);
};
