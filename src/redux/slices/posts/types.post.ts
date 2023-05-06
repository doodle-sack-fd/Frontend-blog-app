export interface IUser {
	_id: string;
	fullName: string;
	email: string;
	passwordHash: string;
	avatarUrl: string;
	createdAt: string;
	updatedAt: string;
}

export interface IPostItem {
	_id: string;
	title: string;
	text: string;
	tags: [];
	viewsCount: number;
	user: IUser;
	imageUrl: string;
	createdAt: string;
	updatedAt: string;
}

export interface ITags {
	items: string[];
}

export interface IPostSlice {
	posts: {
		items: IPostItem[];
		status: string;
	};
	tags: {
		items: ITags[];
		status: string;
	};
}
