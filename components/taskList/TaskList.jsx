import "./task-list.css";
import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
	const {
		tasks,
		deleteTask,
		toggleComplete,
		editTask,
		setCountdown,
		resetCountdown,
	} = useContext(TaskContext);

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
					<TaskItem
						key={task.id}
						task={task}
						editingTaskId={editingTaskId}
						editTitle={editTitle}
						editDescription={editDescription}
						setEditTitle={setEditTitle}
						setEditDescription={setEditDescription}
						handleEditClick={handleEditClick}
						handleSaveClick={handleSaveClick}
						cancelEditMode={cancelEditMode}
						deleteTask={deleteTask}
						toggleComplete={toggleComplete}
						setCountdown={setCountdown}
						resetCountdown={resetCountdown}
					/>
				))
			) : (
				<p className="task-status">
					Your tasks will be shown here. You&apos;ve added no tasks yet!
				</p>
			)}
		</div>
	);
}
