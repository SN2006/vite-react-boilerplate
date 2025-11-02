import type { FunctionComponent } from "../common/types";
import { useMyTasks } from "../features/tasks/api";
import { useMyStates } from "../features/states/api";
import { Task } from "../features/tasks/types";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "@tanstack/react-router";

export const Dashboard = (): FunctionComponent => {
	const { data: tasks, isLoading: tasksLoading, isError: tasksError } = useMyTasks();
	const { data: states, isLoading: statesLoading, isError: statesError } = useMyStates();
	const clearToken = useAuthStore((state) => state.clearToken);
	const navigate = useNavigate();

	const handleLogout = () => {
		clearToken();
		navigate({ to: "/login" });
	};

	if (tasksLoading || statesLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	if (tasksError || statesError) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<p className="text-red-600">Error loading data. Please try again.</p>
					<button
						onClick={handleLogout}
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Back to Login
					</button>
				</div>
			</div>
		);
	}

	// Group tasks by state
	const tasksByState = tasks?.reduce((acc, task) => {
		const stateId = task.state.id;
		if (!acc[stateId]) {
			acc[stateId] = [];
		}
		acc[stateId].push(task);
		return acc;
	}, {} as Record<number, Task[]>) || {};

	const getPriorityColor = (priority: string) => {
		switch (priority.toLowerCase()) {
			case "high":
				return "bg-red-100 text-red-800 border-red-300";
			case "medium":
				return "bg-yellow-100 text-yellow-800 border-yellow-300";
			case "low":
				return "bg-green-100 text-green-800 border-green-300";
			default:
				return "bg-gray-100 text-gray-800 border-gray-300";
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm border-b border-gray-200">
				<div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
						<span className="text-sm text-gray-500">
							{tasks?.length || 0} task{tasks?.length !== 1 ? "s" : ""}
						</span>
					</div>
					<button
						onClick={handleLogout}
						className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
					>
						Logout
					</button>
				</div>
			</header>

			{/* Kanban Board */}
			<div className="max-w-full mx-auto px-6 py-6">
				<div className="flex gap-4 overflow-x-auto pb-4">
					{states?.map((state) => {
						const stateTasks = tasksByState[state.id] || [];
						return (
							<div
								key={state.id}
								className="flex-shrink-0 w-80 bg-gray-100 rounded-lg"
							>
								{/* Column Header */}
								<div className="px-4 py-3 bg-gray-200 rounded-t-lg">
									<div className="flex items-center justify-between">
										<h2 className="font-semibold text-gray-800">
											{state.name}
										</h2>
										<span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-300 rounded-full">
											{stateTasks.length}
										</span>
									</div>
								</div>

								{/* Task Cards */}
								<div className="p-3 space-y-3 min-h-[200px]">
									{stateTasks.length === 0 ? (
										<p className="text-center text-gray-500 text-sm py-8">
											No tasks
										</p>
									) : (
										stateTasks.map((task) => (
											<div
												key={task.id}
												className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
											>
												{/* Task Title */}
												<h3 className="font-medium text-gray-900 mb-2">
													{task.title}
												</h3>

												{/* Task Description */}
												{task.description && (
													<p className="text-sm text-gray-600 mb-3 line-clamp-2">
														{task.description}
													</p>
												)}

												{/* Task Meta */}
												<div className="flex items-center gap-2 mb-3">
													{/* Priority Badge */}
													<span
														className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(
															task.priority
														)}`}
													>
														{task.priority}
													</span>

													{/* Task Type */}
													<span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded border border-blue-300">
														{task.taskType.name}
													</span>
												</div>

												{/* Footer */}
												<div className="flex items-center justify-between pt-3 border-t border-gray-200">
													{/* Due Date */}
													<div className="flex items-center gap-1 text-xs text-gray-600">
														<svg
															className="w-4 h-4"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
															/>
														</svg>
														{formatDate(task.dueDate)}
													</div>

													{/* Owner Avatar */}
													<div className="flex items-center gap-2">
														<div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-medium">
															{task.owner.name
																? task.owner.name
																		.split(" ")
																		.map((n) => n[0])
																		.join("")
																		.toUpperCase()
																		.slice(0, 2)
																: task.owner.email?.[0]?.toUpperCase() || "U"}
														</div>
													</div>
												</div>
											</div>
										))
									)}
								</div>
							</div>
						);
					})}
				</div>

				{/* Empty State */}
				{states?.length === 0 && (
					<div className="text-center py-12">
						<svg
							className="mx-auto h-12 w-12 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
							/>
						</svg>
						<h3 className="mt-2 text-sm font-medium text-gray-900">No states</h3>
						<p className="mt-1 text-sm text-gray-500">
							Get started by creating a new state.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

