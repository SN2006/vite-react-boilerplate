interface DeleteTaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	taskTitle: string;
	isLoading?: boolean;
}

export const DeleteTaskModal = ({
	isOpen,
	onClose,
	onConfirm,
	taskTitle,
	isLoading = false,
}: DeleteTaskModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
				{/* Header */}
				<div className="px-6 py-4 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900">Delete Task</h3>
				</div>

				{/* Body */}
				<div className="px-6 py-4">
					<p className="text-sm text-gray-600">
						Are you sure you want to delete the task{" "}
						<span className="font-semibold text-gray-900">"{taskTitle}"</span>?
						This action cannot be undone.
					</p>
					<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
						<p className="text-sm text-red-800">
							⚠️ Warning: All data associated with this task will be permanently deleted.
						</p>
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
						type="button"
						onClick={onConfirm}
						disabled={isLoading}
						className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? "Deleting..." : "Delete"}
					</button>
				</div>
			</div>
		</div>
	);
};
