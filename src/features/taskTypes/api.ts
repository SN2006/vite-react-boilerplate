import { GetMyTaskTypesResponse, TaskType } from "./types.ts";
import apiClient from "../../lib/axious.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

const getMyTaskTypes = async () : Promise<TaskType[]> => {
	const response = await apiClient.get<GetMyTaskTypesResponse>("/task-types/my");
	return response.data.data;
}

const createTaskType = async (name: string): Promise<void> => {
	await apiClient.post(`/task-types`, { name: name });
}

const updateTaskType = async ({id, name}: { id: number, name: string }): Promise<void> => {
	await apiClient.patch(`/task-types/${id}`, { name: name });
}

const deleteTaskType = async (id: number): Promise<void> => {
	await apiClient.delete(`/task-types/${id}`);
}

export const useMyTaskTypes = () => useQuery<TaskType[]>({
	queryKey: ["my-task-types"],
	queryFn: getMyTaskTypes,
});

export const useCreateTaskType = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: createTaskType,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["my-task-types"] });
			queryClient.invalidateQueries({ queryKey: ["task-types"] });
			queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
			navigate({ to: "/task-types" });
		}
	});
}

export const useUpdateTaskType = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: updateTaskType,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["my-task-types"] });
			queryClient.invalidateQueries({ queryKey: ["task-types"] });
			queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			navigate({ to: "/task-types" });
		}
	});
}

export const useDeleteTaskType = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: deleteTaskType,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["my-task-types"] });
			queryClient.invalidateQueries({ queryKey: ["task-types"] });
			queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			navigate({ to: "/task-types" });
		}
	});
}