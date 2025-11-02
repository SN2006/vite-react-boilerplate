import { createFileRoute, redirect } from '@tanstack/react-router';
import { TaskTypes } from '../pages/TaskTypes';
import { useAuthStore } from '../store/authStore';

export const Route = createFileRoute('/task-types')({
	beforeLoad: () => {
		const token = useAuthStore.getState().token;
		if (!token) {
			throw redirect({ to: '/login' });
		}
	},
	component: TaskTypes,
});

