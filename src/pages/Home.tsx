import type { FunctionComponent } from "../common/types";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export const Home = (): FunctionComponent => {
	const navigate = useNavigate();
	const token = useAuthStore((state) => state.token);

	useEffect(() => {
		if (token) {
			navigate({ to: "/dashboard" });
		}
	}, [token, navigate]);

	const onLoginClick = () => {
		navigate({ to: "/login" });
	};

	return (
		<div className="bg-gradient-to-br from-blue-500 to-blue-700 w-screen h-screen flex flex-col justify-center items-center gap-6">
			<div className="text-center">
				<h1 className="font-serif text-5xl text-white mb-2">Task Manager</h1>
				<p className="text-blue-100 text-lg">Manage your tasks efficiently</p>
			</div>
			<button
				className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
				onClick={onLoginClick}
			>
				Get Started
			</button>
		</div>
	);
};
