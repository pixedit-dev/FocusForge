import "./task-list.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function TaskList() {
	return (
		<div className="tasks-section">
			<div className={`task-list`}>
				<p className="task-title">TITLE</p>
				<div className="task-control">
					<p>DESCRIPTION</p>
					<button aria-label="Delete Task" title="Delete Task">
						<FaTrashAlt />
					</button>
					<button title="Edit Task">
						<FaEdit />
					</button>
					<button title="Mark as Completed">
						<IoCheckmarkCircle />
					</button>
				</div>
			</div>
		</div>
	);
}
