import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function TaskDisplay({
	task,
	onDelete,
	onEdit,
	onToggleComplete,
}) {
	return (
		<>
			<p className="task-title">{task.title}</p>
			{task.isCompleted && <p className="completed-message">Task Completed</p>}

			<div className="task-description">
				<div className="description">
					<p>{task.description}</p>
				</div>

				<div className="task-control">
					<button onClick={onDelete} title="Delete task">
						<FaTrashAlt />
					</button>
					{!task.isCompleted && (
						<button onClick={onEdit} title="Edit task">
							<FaEdit />
						</button>
					)}
					<button onClick={onToggleComplete} title="Mark as completed">
						<IoCheckmarkCircle />
					</button>
				</div>
			</div>
		</>
	);
}
