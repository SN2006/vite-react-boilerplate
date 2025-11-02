import { GetMyTaskResponse, Task, TaskRequest } from "./types.ts";
import apiClient from "../../lib/axious.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

const getMyTasks = async () : Promise<Task[]> => {
	const response = await apiClient.get<GetMyTaskResponse>("/tasks/my");
	console.log(response.data.data);
	return response.data.data;
}

const createTask = async (task: TaskRequest) => {
	await apiClient.post(`/tasks`, task);
}

const updateTask = async ({id, task}: {id: number, task: TaskRequest}) => {
	await apiClient.patch(`/tasks/${id}`, task);
}

const deleteTask = async (id: number) => {
	await apiClient.delete(`/tasks/${id}`);
}

export const useMyTasks = () => useQuery<Task[]>({
	queryKey: ["my-tasks"],
	queryFn: getMyTasks,
});

export const useCreateTask = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: createTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			navigate({ to: "/dashboard" });
		}
	});
}

export const useUpdateTask = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: updateTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			navigate({ to: "/dashboard" });
		}
	});
}

export const useDeleteTask = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: deleteTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			navigate({ to: "/dashboard" });
		}
	});
}