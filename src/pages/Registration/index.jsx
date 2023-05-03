import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchRegister } from '../../redux/actions/action.creators';
import { selectIsAuth } from '../../redux/slices/auth';
import styles from './Login.module.scss';

export const Registration = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			fullName: 'Vasya',
			email: 'vasya@mail.ru',
			password: 'qwerty',
		},
		mode: 'onChange',
	});

	const onSubmit = async data => {
		const res = await dispatch(fetchRegister(data));
		if (!res.payload) {
			return alert('Не удалось зарегистрироваться');
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
				Создание аккаунта
			</Typography>
			<div className={styles.avatar}>
				<Avatar sx={{ width: 100, height: 100 }} />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					type="name"
					error={!!errors.fullName?.message}
					helperText={errors.fullName?.message}
					{...register('fullName', { required: 'Укажите имя' })}
					className={styles.field}
					label="Полное имя"
					fullWidth
				/>
				<TextField
					type="email"
					error={!!errors.email?.message}
					helperText={errors.email?.message}
					{...register('email', { required: 'Укажите почту' })}
					className={styles.field}
					label="E-Mail"
					fullWidth
				/>
				<TextField
					type="password"
					error={!!errors.password?.message}
					helperText={errors.password?.message}
					{...register('password', { required: 'Укажите пароль' })}
					className={styles.field}
					label="Пароль"
					fullWidth
				/>
				<Button
					disabled={!isValid}
					type="onSubmit"
					size="large"
					variant="contained"
					fullWidth
				>
					Зарегистрироваться
				</Button>
			</form>
		</Paper>
	);
};
