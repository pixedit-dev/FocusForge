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
									<div>
										<h4>Edit Title</h4>
										<input
											autoFocus
											type="text"
											value={editTitle}
											onChange={(e) => setEditTitle(e.target.value)}
											placeholder="Edit Title"
										/>
									</div>
									<div>
										<h4>Edit Description</h4>

										<input
											type="text"
											value={editDescription}
											onChange={(e) => setEditDescription(e.target.value)}
											placeholder="Edit Description"
										/>
									</div>
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
								<div className="task-description">
									<div className="description">
										<p>{task.description}</p>
									</div>
									<div className="task-control">
										<button
											onClick={() => deleteTask(task.id)}
											title="Delete task">
											<FaTrashAlt />
										</button>
										{!task.isCompleted && (
											<button
												onClick={() => handleEditClick(task)}
												title="Edit task">
												<FaEdit />
											</button>
										)}
										<button
											onClick={() => toggleComplete(task.id)}
											title="Mark as completed">
											<IoCheckmarkCircle />
										</button>
									</div>
									<div className="time-management-section"></div>
								</div>
							</>
						)}
					</div>
				))
			) : (
				<p className="task-status">
					Your tasks will be shown here. You&apos;ve added no tasks yet!
				</p>
			)}
		</div>
	);
}
