import { AddPost, FullPost, Home, Login, Registration } from '../pages';

export const routes = [
	{
		path: '/home',
		component: Home,
	},
	{
		path: '/posts/:id',
		component: FullPost,
	},
	{
		path: '/posts/:id/edit',
		component: AddPost,
	},
	{
		path: '/add-post',
		component: AddPost,
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/register',
		component: Registration,
	},
];
