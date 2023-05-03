import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import 'easymde/dist/easymde.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import axios from '../../axios';
import styles from './AddPost.module.scss';

export const AddPost = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [text, setText] = useState('');
	const [title, setTitle] = useState('');
	const [tags, setTags] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const inputFileRef = useRef(null);

	const isEditing = !!id;
	const handleChangeFile = async e => {
		try {
			let formData = new FormData();
			const file = e.target.files[0];
			formData.append('image', file);
			const { data } = await axios.post('/upload', formData);
			setImageUrl(data.url);
		} catch (error) {
			console.log(error);
		}
	};

	const onClickRemoveImage = () => {
		setImageUrl('');
	};

	const onChange = React.useCallback(value => {
		setText(value);
	}, []);

	const onSubmit = async () => {
		try {
			setIsLoading(true);
			const fields = {
				title,
				text,
				tags: tags.split(','),
				imageUrl,
			};
			const { data } = isEditing
				? await axios.patch(`/posts/${id}`, fields)
				: await axios.post('/posts', fields);
			console.log(data);
			const idPost = isEditing ? id : data._id;
			navigate(`/posts/${idPost}`);
		} catch (error) {
			console.log(error);
			alert('Error article');
		}
	};

	useEffect(() => {
		if (id) {
			axios.get(`/posts/${id}`).then(({ data }) => {
				setTitle(data.title);
				setText(data.text);
				setImageUrl(data.imageUrl);
				setTags(data.tags.join(','));
			});
		}
	}, []);

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[],
	);

	return (
		<Paper style={{ padding: 30 }}>
			<Button
				onClick={() => inputFileRef.current.click()}
				variant="outlined"
				size="large"
			>
				Загрузить превью
			</Button>
			<input
				ref={inputFileRef}
				type="file"
				onChange={handleChangeFile}
				hidden
			/>
			{imageUrl && (
				<>
					<Button
						variant="contained"
						color="error"
						onClick={onClickRemoveImage}
					>
						Удалить
					</Button>
					<img
						className={styles.image}
						src={`http://localhost:4000${imageUrl}`}
						alt="Uploaded"
					/>
				</>
			)}
			<br />
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant="standard"
				placeholder="Заголовок статьи..."
				fullWidth
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant="standard"
				placeholder="Тэги"
				fullWidth
				value={tags}
				onChange={e => setTags(e.target.value)}
			/>
			<SimpleMDE
				className={styles.editor}
				value={text}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button onClick={onSubmit} size="large" variant="contained">
					{isEditing ? 'Сохранить' : 'Опубликовать'}
				</Button>
				<a href="/">
					<Button size="large">Отмена</Button>
				</a>
			</div>
		</Paper>
	);
};
