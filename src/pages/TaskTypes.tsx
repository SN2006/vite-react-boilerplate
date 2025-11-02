import type { FunctionComponent } from "../common/types";
import { useMyTaskTypes, useCreateTaskType, useUpdateTaskType, useDeleteTaskType } from "../features/taskTypes/api";
import { TaskType } from "../features/taskTypes/types";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "@tanstack/react-router";
import {
	DeleteTaskTypeModal
} from "../components/taskTypes/DeleteTaskTypeModal";
import { useState } from "react";
import { TaskTypeModal } from "../components/taskTypes/TaskTypeModal.tsx";

export const TaskTypes = (): FunctionComponent => {
	const { data: taskTypes, isLoading, isError } = useMyTaskTypes();
	const clearToken = useAuthStore((state) => state.clearToken);
	const navigate = useNavigate();

	// Task type management mutations
	const createTaskTypeMutation = useCreateTaskType();
	const updateTaskTypeMutation = useUpdateTaskType();
	const deleteTaskTypeMutation = useDeleteTaskType();

	// Modal states
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [editingTaskType, setEditingTaskType] = useState<TaskType | null>(null);
	const [deletingTaskType, setDeletingTaskType] = useState<TaskType | null>(null);

	const handleLogout = () => {
		clearToken();
		navigate({ to: "/login" });
	};

	const handleBackToDashboard = () => {
		navigate({ to: "/dashboard" });
	};

	const handleCreateTaskType = (name: string) => {
		createTaskTypeMutation.mutate(name, {
			onSuccess: () => {
				setIsCreateModalOpen(false);
			},
		});
	};

	const handleUpdateTaskType = (name: string) => {
		if (editingTaskType) {
			updateTaskTypeMutation.mutate(
				{ id: editingTaskType.id, name },
				{
					onSuccess: () => {
						setEditingTaskType(null);
					},
				}
			);
		}
	};

	const handleDeleteTaskType = () => {
		if (deletingTaskType) {
			deleteTaskTypeMutation.mutate(deletingTaskType.id, {
				onSuccess: () => {
					setDeletingTaskType(null);
				},
			});
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="text-center">
					<p className="text-red-600">Error loading task types. Please try again.</p>
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

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<button
							onClick={handleBackToDashboard}
							className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
							title="Back to Dashboard"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
						</button>
						<h1 className="text-2xl font-bold text-gray-900">Task Types</h1>
						<span className="text-sm text-gray-500">
							{taskTypes?.length || 0} type{taskTypes?.length !== 1 ? "s" : ""}
						</span>
					</div>
					<div className="flex items-center gap-3">
						<button
							onClick={() => setIsCreateModalOpen(true)}
							className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
						>
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
									d="M12 4v16m8-8H4"
								/>
							</svg>
							Add Task Type
						</button>
						<button
							onClick={handleLogout}
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
						>
							Logout
						</button>
					</div>
				</div>
			</header>

			{/* Content */}
			<div className="max-w-7xl mx-auto px-6 py-8">
				{taskTypes && taskTypes.length > 0 ? (
					<div className="bg-white rounded-lg shadow overflow-hidden">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										ID
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Name
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{taskTypes.map((taskType) => (
									<tr key={taskType.id} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											#{taskType.id}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full border border-blue-300">
													{taskType.name}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<button
												onClick={() => setEditingTaskType(taskType)}
												className="text-blue-600 hover:text-blue-900 mr-4"
											>
												<svg
													className="w-5 h-5 inline"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
													/>
												</svg>
											</button>
											<button
												onClick={() => setDeletingTaskType(taskType)}
												className="text-red-600 hover:text-red-900"
											>
												<svg
													className="w-5 h-5 inline"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													/>
												</svg>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div className="text-center py-12 bg-white rounded-lg shadow">
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
								d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
							/>
						</svg>
						<h3 className="mt-2 text-sm font-medium text-gray-900">No task types</h3>
						<p className="mt-1 text-sm text-gray-500">
							Get started by creating a new task type.
						</p>
						<div className="mt-6">
							<button
								onClick={() => setIsCreateModalOpen(true)}
								className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
							>
								<svg
									className="w-5 h-5 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 4v16m8-8H4"
									/>
								</svg>
								Add Task Type
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Modals */}
			<TaskTypeModal
				isOpen={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				onSubmit={handleCreateTaskType}
				title="Create New Task Type"
				isLoading={createTaskTypeMutation.isPending}
			/>

			<TaskTypeModal
				isOpen={editingTaskType !== null}
				onClose={() => setEditingTaskType(null)}
				onSubmit={handleUpdateTaskType}
				title="Edit Task Type"
				initialValue={editingTaskType?.name || ""}
				isLoading={updateTaskTypeMutation.isPending}
			/>

			<DeleteTaskTypeModal
				isOpen={deletingTaskType !== null}
				onClose={() => setDeletingTaskType(null)}
				onConfirm={handleDeleteTaskType}
				taskTypeName={deletingTaskType?.name || ""}
				isLoading={deleteTaskTypeMutation.isPending}
			/>
		</div>
	);
};

