import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const taskTypeSchema = z.object({
	name: z
		.string()
		.min(1, "Task type name is required")
		.max(50, "Name is too long"),
});

type TaskTypeFormData = z.infer<typeof taskTypeSchema>;

interface TaskTypeModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (name: string) => void;
	title: string;
	initialValue?: string;
	isLoading?: boolean;
}

export const TaskTypeModal = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	initialValue = "",
	isLoading = false,
}: TaskTypeModalProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TaskTypeFormData>({
		resolver: zodResolver(taskTypeSchema),
		defaultValues: {
			name: initialValue,
		},
	});

	useEffect(() => {
		reset({ name: initialValue });
	}, [initialValue, reset]);

	const handleFormSubmit = (data: TaskTypeFormData) => {
		onSubmit(data.name);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
				{/* Header */}
				<div className="px-6 py-4 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
				</div>

				{/* Body */}
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<div className="px-6 py-4">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Task Type Name
						</label>
						<input
							{...register("name")}
							id="name"
							type="text"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder="e.g., Bug, Feature, Enhancement"
							autoFocus
						/>
						{errors.name && (
							<p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
						)}
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
							disabled={isLoading}
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
