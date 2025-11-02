import { createFileRoute, redirect } from '@tanstack/react-router';
import { Dashboard } from '../pages/Dashboard';
import { useAuthStore } from '../store/authStore';

export const Route = createFileRoute('/dashboard')({
	beforeLoad: () => {
		const token = useAuthStore.getState().token;
		if (!token) {
			throw redirect({ to: '/login' });
		}
	},
	component: Dashboard,
});

