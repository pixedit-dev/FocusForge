import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import PropTypes from "prop-types";

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

TaskDisplay.propTypes = {
	task: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		isCompleted: PropTypes.bool.isRequired,
		time: PropTypes.shape({
			hour: PropTypes.number,
			min: PropTypes.number,
			active: PropTypes.bool,
			targetTime: PropTypes.number,
		}),
	}).isRequired,
	onDelete: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onToggleComplete: PropTypes.func.isRequired,
};
