import { GetMyTaskResponse, Task } from "./types.ts";
import apiClient from "../../lib/axious.ts";
import { useQuery } from "@tanstack/react-query";

const getMyTasks = async () : Promise<Task[]> => {
	const response = await apiClient.get<GetMyTaskResponse>("/tasks/my");
	console.log(response.data.data);
	return response.data.data;
}

export const useMyTasks = () => useQuery<Task[]>({
	queryKey: ["my-tasks"],
	queryFn: getMyTasks,
});