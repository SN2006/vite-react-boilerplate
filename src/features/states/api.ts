import { GetMyStatesResponse, State } from "./types.ts";
import apiClient from "../../lib/axious.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

const getMyStates = async (): Promise<State[]> => {
	const response = await apiClient.get<GetMyStatesResponse>("/states/my");
	console.log(response.data.data);
	return response.data.data;
}

const createState = async (name: string): Promise<void> => {
	await apiClient.post(`/states`, { name: name });
}

const updateState = async ({id, name}: { id: number, name: string }): Promise<void> => {
	await apiClient.patch(`/states/${id}`, { name: name });
};

const deleteState = async (id: number): Promise<void> => {
	await apiClient.delete(`/states/${id}`);
}

export const useMyStates = () => useQuery<State[]>({
	queryKey: ["my-states"],
	queryFn: getMyStates,
});

export const useCreateState = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: createState,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["my-states"] });
			queryClient.invalidateQueries({ queryKey: ["states"] });
			navigate({ to: "/dashboard" });
		}
	});
}

export const useUpdateState = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: updateState,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["my-states"] });
			queryClient.invalidateQueries({ queryKey: ["states"] });
			queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			navigate({ to: "/dashboard" });
		}
	});
}

export const useDeleteState = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: deleteState,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["my-states"] });
			queryClient.invalidateQueries({ queryKey: ["states"] });
			queryClient.invalidateQueries({ queryKey: ["my-tasks"] });
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			navigate({ to: "/dashboard" });
		}
	});
}