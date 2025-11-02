import { GetMyStatesResponse, State } from "./types.ts";
import apiClient from "../../lib/axious.ts";
import { useQuery } from "@tanstack/react-query";

const getMyStates = async (): Promise<State[]> => {
	const response = await apiClient.get<GetMyStatesResponse>("/states/my");
	console.log(response.data.data);
	return response.data.data;
}

export const useMyStates = () => useQuery<State[]>({
	queryKey: ["my-states"],
	queryFn: getMyStates,
});