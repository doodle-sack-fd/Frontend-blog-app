import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { fetchRemovePost } from '../../redux/actions/action.creators';
import { useAppDispatch } from '../../redux/store';
import { ITags, IUser } from '../../types/types.global';
import { UserInfo } from '../UserInfo';
import styles from './Post.module.scss';
import { PostSkeleton } from './Skeleton';

export interface IPost {
	_id?: string;
	title?: string;
	createdAt?: string;
	imageUrl?: string;
	user?: IUser;
	viewsCount?: number;
	commentsCount?: any;
	tags?: ITags[];
	children?: any;
	isFullPost?: any;
	isLoading?: boolean;
	isEditable?: boolean;
}

export const Post = ({
	_id,
	title,
	createdAt,
	imageUrl,
	user,
	viewsCount,
	commentsCount,
	tags,
	children,
	isFullPost,
	isLoading,
	isEditable,
}: IPost) => {
	const dispatch = useAppDispatch();
	if (isLoading) {
		return <PostSkeleton />;
	}

	const onClickRemove = () => {
		if (window.confirm('Are you sure?')) {
			dispatch(fetchRemovePost(_id));
		}
	};

	return (
		<div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
			{isEditable && (
				<div className={styles.editButtons}>
					<Link to={`/posts/${_id}/edit`}>
						<IconButton color="primary">
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton onClick={onClickRemove} color="secondary">
						<DeleteIcon />
					</IconButton>
				</div>
			)}
			{imageUrl && (
				<img
					className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
					src={imageUrl}
					alt={title}
				/>
			)}
			<div className={styles.wrapper}>
				<UserInfo {...user} additionalText={createdAt} />
				<div className={styles.indention}>
					<h2
						className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
					>
						{isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
					</h2>
					<ul className={styles.tags}>
						{tags.map((id, name) => (
							<li key={name}>
								<Link to={`/tag/${name}`}>{name}</Link>
							</li>
						))}
					</ul>
					{children && <div className={styles.content}>{children}</div>}
					<ul className={styles.postDetails}>
						<li>
							<EyeIcon />
							<span>{viewsCount}</span>
						</li>
						<li>
							<CommentIcon />
							<span>{commentsCount}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
