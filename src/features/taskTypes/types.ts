import { User } from "../users/types.ts";

export interface TaskType {
	id: number;
	name: string;
	owner: User;
}

export interface GetMyTaskTypesResponse {
	message: string;
	data: TaskType[];
}