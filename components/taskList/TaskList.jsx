import "./task-list.css";
import { useContext, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TaskContext } from "../../context/TaskContext";

export default function TaskList() {
	const { tasks, deleteTask, toggleComplete, editTask } =
		useContext(TaskContext);

	const [editingTaskId, setEditingTaskId] = useState(null);
	const [editTitle, setEditTitle] = useState("");
	const [editDescription, setEditDescription] = useState("");

	const handleEditClick = (task) => {
		setEditingTaskId(task.id);
		setEditTitle(task.title);
		setEditDescription(task.description);
	};

	const handleSaveClick = (id) => {
		editTask(id, editTitle, editDescription);
		setEditingTaskId(null);
		setEditTitle("");
		setEditDescription("");
	};

	const cancelEditMode = () => {
		setEditingTaskId(null);
	};

	return (
		<div className="tasks-section">
			{tasks.length > 0 ? (
				tasks.map((task) => (
					<div
						className={`task-list ${task.isCompleted ? "completed" : ""}`}
						key={task.id}>
						{editingTaskId === task.id ? (
							<>
								<h4 className="edit-title">Edit your task</h4>
								<div className="edit-mode">
									<input
										autoFocus
										type="text"
										value={editTitle}
										onChange={(e) => setEditTitle(e.target.value)}
										placeholder="Edit Title"
									/>
									<input
										type="text"
										value={editDescription}
										onChange={(e) => setEditDescription(e.target.value)}
										placeholder="Edit Description"
									/>
									<button
										onClick={() => handleSaveClick(task.id)}
										className="save-edit-mode">
										Save
									</button>
									<button
										onClick={() => cancelEditMode()}
										className="cancel-edit-mode">
										Cancel
									</button>
								</div>
							</>
						) : (
							<>
								<p className="task-title">{task.title}</p>
								{task.isCompleted ? (
									<p className="completed-message">Task Completed</p>
								) : null}
								<div className="task-control">
									<p>{task.description}</p>
									<button onClick={() => deleteTask(task.id)}>
										<FaTrashAlt />
									</button>
									{!task.isCompleted && (
										<button onClick={() => handleEditClick(task)}>
											<FaEdit />
										</button>
									)}
									<button onClick={() => toggleComplete(task.id)}>
										<IoCheckmarkCircle />
									</button>
								</div>
							</>
						)}
					</div>
				))
			) : (
				<p className="task-status">You have added no task yet!</p>
			)}
		</div>
	);
}
