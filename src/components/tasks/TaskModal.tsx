import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { Task } from "../../features/tasks/types";
import { State } from "../../features/states/types";
import { TaskType } from "../../features/taskTypes/types";

const taskSchema = z.object({
	title: z.string().min(1, "Title is required").max(100, "Title is too long"),
	description: z.string().min(1, "Description is required").max(500, "Description is too long"),
	priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
	stateId: z.number(),
	taskTypeId: z.number(),
	dueDate: z.string().min(1, "Due date is required"),
});

export type TaskFormData = z.infer<typeof taskSchema>;

interface TaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: TaskFormData) => void;
	title: string;
	initialValue?: Task;
	isLoading?: boolean;
	states: State[];
	taskTypes: TaskType[];
}

export const TaskModal = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	initialValue,
	isLoading = false,
	states,
	taskTypes,
}: TaskModalProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TaskFormData>({
		resolver: zodResolver(taskSchema),
		defaultValues: initialValue
			? {
					title: initialValue.title,
					description: initialValue.description,
					priority: initialValue.priority as "LOW" | "MEDIUM" | "HIGH",
					stateId: initialValue.state.id,
					taskTypeId: initialValue.taskType.id,
					dueDate: initialValue.dueDate.split("T")[0], // Convert to YYYY-MM-DD
			  }
			: {
					priority: "MEDIUM",
			  },
	});

	useEffect(() => {
		if (initialValue) {
			reset({
				title: initialValue.title,
				description: initialValue.description,
				priority: initialValue.priority as "LOW" | "MEDIUM" | "HIGH",
				stateId: initialValue.state.id,
				taskTypeId: initialValue.taskType.id,
				dueDate: initialValue.dueDate.split("T")[0],
			});
		} else {
			reset({
				title: "",
				description: "",
				priority: "MEDIUM",
				stateId: states[0]?.id,
				taskTypeId: taskTypes[0]?.id,
				dueDate: "",
			});
		}
	}, [initialValue, reset, states, taskTypes]);

	const handleFormSubmit = (data: TaskFormData) => {
		onSubmit(data);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
			<div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 my-8">
				{/* Header */}
				<div className="px-6 py-4 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
				</div>

				{/* Body */}
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
						{/* Title */}
						<div>
							<label
								htmlFor="title"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Title *
							</label>
							<input
								{...register("title")}
								id="title"
								type="text"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Enter task title"
							/>
							{errors.title && (
								<p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
							)}
						</div>

						{/* Description */}
						<div>
							<label
								htmlFor="description"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Description *
							</label>
							<textarea
								{...register("description")}
								id="description"
								rows={4}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
								placeholder="Enter task description"
							/>
							{errors.description && (
								<p className="mt-1 text-sm text-red-600">
									{errors.description.message}
								</p>
							)}
						</div>

						{/* Priority, State, and Task Type - Row */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{/* Priority */}
							<div>
								<label
									htmlFor="priority"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Priority *
								</label>
								<select
									{...register("priority")}
									id="priority"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option value="LOW">Low</option>
									<option value="MEDIUM">Medium</option>
									<option value="HIGH">High</option>
								</select>
								{errors.priority && (
									<p className="mt-1 text-sm text-red-600">
										{errors.priority.message}
									</p>
								)}
							</div>

							{/* State */}
							<div>
								<label
									htmlFor="stateId"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									State *
								</label>
								<select
									{...register("stateId", { valueAsNumber: true })}
									id="stateId"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									{states.length === 0 ? (
										<option value="">No states available</option>
									) : (
										states.map((state) => (
											<option key={state.id} value={state.id}>
												{state.name}
											</option>
										))
									)}
								</select>
								{errors.stateId && (
									<p className="mt-1 text-sm text-red-600">
										{errors.stateId.message}
									</p>
								)}
							</div>

							{/* Task Type */}
							<div>
								<label
									htmlFor="taskTypeId"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Task Type *
								</label>
								<select
									{...register("taskTypeId", { valueAsNumber: true })}
									id="taskTypeId"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									{taskTypes.length === 0 ? (
										<option value="">No types available</option>
									) : (
										taskTypes.map((type) => (
											<option key={type.id} value={type.id}>
												{type.name}
											</option>
										))
									)}
								</select>
								{errors.taskTypeId && (
									<p className="mt-1 text-sm text-red-600">
										{errors.taskTypeId.message}
									</p>
								)}
							</div>
						</div>

						{/* Due Date */}
						<div>
							<label
								htmlFor="dueDate"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Due Date *
							</label>
							<input
								{...register("dueDate")}
								id="dueDate"
								type="date"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
							{errors.dueDate && (
								<p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
							)}
						</div>
					</div>

					{/* Footer */}
					<div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-lg">
						<button
							type="button"
							onClick={onClose}
							disabled={isLoading}
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isLoading || states.length === 0 || taskTypes.length === 0}
							className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? "Saving..." : "Save"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

