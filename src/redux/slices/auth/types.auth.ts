import { IUser } from '../posts/types.post';

export interface IUserAuth {
	data: IUser;
	status: string;
}
