import { Task } from "../../features/tasks/types";

interface TaskDetailModalProps {
	isOpen: boolean;
	onClose: () => void;
	onEdit: () => void;
	onDelete: () => void;
	task: Task | null;
}

export const TaskDetailModal = ({
	isOpen,
	onClose,
	onEdit,
	onDelete,
	task,
}: TaskDetailModalProps) => {
	if (!isOpen || !task) return null;

	const getPriorityColor = (priority: string) => {
		switch (priority.toUpperCase()) {
			case "HIGH":
				return "bg-red-100 text-red-800 border-red-300";
			case "MEDIUM":
				return "bg-yellow-100 text-yellow-800 border-yellow-300";
			case "LOW":
				return "bg-green-100 text-green-800 border-green-300";
			default:
				return "bg-gray-100 text-gray-800 border-gray-300";
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
					<div className="flex-1">
						<h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
						<p className="text-sm text-gray-500 mt-1">Task #{task.id}</p>
					</div>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition-colors"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* Body */}
				<div className="px-6 py-6 space-y-6">
					{/* Description */}
					<div>
						<h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
							Description
						</h3>
						<p className="text-gray-900 whitespace-pre-wrap">{task.description}</p>
					</div>

					{/* Details Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Priority */}
						<div>
							<h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
								Priority
							</h3>
							<span
								className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getPriorityColor(
									task.priority
								)}`}
							>
								{task.priority}
							</span>
						</div>

						{/* State */}
						<div>
							<h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
								State
							</h3>
							<span className="inline-block px-3 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full border border-gray-300">
								{task.state.name}
							</span>
						</div>

						{/* Task Type */}
						<div>
							<h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
								Task Type
							</h3>
							<span className="inline-block px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full border border-blue-300">
								{task.taskType.name}
							</span>
						</div>

						{/* Due Date */}
						<div>
							<h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
								Due Date
							</h3>
							<div className="flex items-center gap-2 text-gray-900">
								<svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								{formatDate(task.dueDate)}
							</div>
						</div>
					</div>

					{/* Owner */}
					<div>
						<h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
							Owner
						</h3>
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
								{task.owner.name
									? task.owner.name
											.split(" ")
											.map((n) => n[0])
											.join("")
											.toUpperCase()
											.slice(0, 2)
									: task.owner.email?.[0]?.toUpperCase() || "U"}
							</div>
							<div>
								<p className="font-medium text-gray-900">{task.owner.name || "Unknown"}</p>
								<p className="text-sm text-gray-500">{task.owner.email}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-lg">
					<button
						onClick={onDelete}
						className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
						Delete
					</button>
					<button
						onClick={onEdit}
						className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>
						Edit
					</button>
				</div>
			</div>
		</div>
	);
};

