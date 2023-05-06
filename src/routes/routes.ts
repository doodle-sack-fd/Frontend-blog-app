import { AddPost } from '../pages/AddPost/index.jsx';
import { FullPost } from '../pages/FullPost.jsx';
import { Home } from '../pages/Home.jsx';
import { Login } from '../pages/Login/index.jsx';
import { Registration } from '../pages/Registration/index.jsx';

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
