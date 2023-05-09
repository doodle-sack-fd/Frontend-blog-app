import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TagsBlock } from '../components';
import { CommentsBlock } from '../components/CommentsBlock';
import { Post } from '../components/Post';
import { fetchPosts, fetchTags } from '../redux/actions/action.creators';
import { RootState, useAppDispatch } from '../redux/store';

export const Home = () => {
	const dispatch = useAppDispatch();
	const userData = useSelector((state: unknown) => (state as RootState)?.auth);
	const { posts, tags } = useSelector(
		(state: unknown) => (state as RootState)?.posts,
	);
	const isPostLoading = posts.status === 'loading';
	const isTagLoading = posts.status === 'loading';

	useEffect(() => {
		dispatch(fetchPosts());
		dispatch(fetchTags());
	}, []);

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={0}
				aria-label="basic tabs example"
			>
				<Tab label="Новые" />
				<Tab label="Популярные" />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(isPostLoading ? [...Array(5)] : posts.items).map((obj, idx) =>
						isPostLoading ? (
							<Post key={idx} isLoading={true} />
						) : (
							<Post
								_id={obj._id}
								title={obj.title}
								imageUrl={
									obj.imageUrl
										? `http://localhost:4000${obj.imageUrl}`
										: 'https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png'
								}
								user={obj.user}
								createdAt={obj.createdAt}
								viewsCount={obj.viewsCount}
								commentsCount={3}
								tags={obj.tags}
								isEditable={userData?.data._id === obj.user._id}
							/>
						),
					)}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock items={tags.items} isLoading={isTagLoading} />
					<CommentsBlock
						items={[
							{
								user: {
									fullName: 'Вася Пупкин',
									avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
								},
								text: 'Это тестовый комментарий',
							},
							{
								user: {
									fullName: 'Иван Иванов',
									avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
								},
								text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
							},
						]}
						isLoading={false}
						children={undefined}
					/>
				</Grid>
			</Grid>
		</>
	);
};
