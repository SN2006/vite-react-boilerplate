import { LoginResponse, LoginRequest } from "./types.ts";
import apiClient from "../../lib/axious.ts";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../store/authStore.ts";

const login = async (email: string, password: string): Promise<LoginResponse> => {
	const response = await apiClient.post<LoginResponse>("/auth/login", {
		email,
		password,
	});
	return response.data;
};

export const useLogin = () => {
	const navigate = useNavigate();
	const setToken = useAuthStore((state) => state.setToken);

	return useMutation({
		mutationFn: ({ email, password }: LoginRequest) =>
			login(email, password),
		onSuccess: (data) => {
			setToken(data.data);
			navigate({ to: "/dashboard" });
		},
	});
};
