import axios from 'axios';
/* Can now, axios.get(/post) */
const instance = axios.create({
	baseURL: 'http://localhost:4000',
});

instance.interceptors.request.use(config => {
	/* Every req check token */
	config.headers.Authorization = window.localStorage.getItem('token');

	return config;
});

export default instance;
