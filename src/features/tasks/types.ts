import { User } from "../users/types.ts";

export interface Task {
	id: number;
	title: string;
	description: string;
	priority: string;
	dueDate: string;
	owner: User;
	state: TaskState;
	taskType: TaskTaskType;
}

export interface TaskState {
	id: number;
	name: string;
}

export interface TaskTaskType {
	id: number;
	name: string;
}

export interface GetMyTaskResponse {
	message: string;
	data: Task[];
}

export interface TaskRequest {
	title: string;
	description: string;
	priority: "LOW" | "MEDIUM" | "HIGH";
	stateId: number;
	taskTypeId: number;
	dueDate: string;
}