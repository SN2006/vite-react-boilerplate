import { User } from "../users/types.ts";

export interface State {
	id: number;
	name: string;
	owner: User;
}

export interface GetMyStatesResponse {
	message: string;
	data: State[];
}