import "./task-list.css";
import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TaskContext } from "../../context/TaskContext";

export default function TaskList() {
	const { tasks, deleteTask, toggleComplete } = useContext(TaskContext);

	return (
		<div className="tasks-section">
			{tasks.length > 0 ? (
				tasks.map((task) => (
					<div
						className={`task-list ${task.isCompleted ? "completed" : ""}`}
						key={task.id}>
						<p className="task-title">{task.title}</p>
						{task.isCompleted ? (
							<p className="completed-message">Task Completed</p>
						) : null}
						<div className="task-control">
							<p>{task.description}</p>
							<button onClick={() => deleteTask(task.id)}>
								<FaTrashAlt />
							</button>
							<button>
								<FaEdit />
							</button>
							<button onClick={() => toggleComplete(task.id)}>
								<IoCheckmarkCircle />
							</button>
						</div>
					</div>
				))
			) : (
				<p className="task-status">You have added no task yet!</p>
			)}
		</div>
	);
}
