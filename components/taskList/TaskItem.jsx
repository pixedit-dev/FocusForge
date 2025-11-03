import { useState, useEffect, useContext } from "react";
import TaskEditForm from "./TaskEditForm";
import TaskDisplay from "./TaskDisplay";
import CountdownTimer from "./CountdownTimer";
import { TaskContext } from "../../context/TaskContext";
import PropTypes from "prop-types";

TaskItem.propTypes = {
	task: PropTypes.object.isRequired,
};

export default function TaskItem({ task }) {
	const { deleteTask, toggleComplete, setCountdown, resetCountdown, editTask } =
		useContext(TaskContext);

	// edit section here
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(task.title);
	const [editDescription, setEditDescription] = useState(task.description);
	const [, forceUpdate] = useState(0);

	const handleSave = () => {
		editTask(task.id, editTitle, editDescription);
		setIsEditing(false);
	};

	// update countdown timer each second
	useEffect(() => {
		const interval = setInterval(() => {
			forceUpdate((n) => n + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className={`task-list ${task.isCompleted ? "completed" : ""}`}>
			{isEditing ? (
				<TaskEditForm
					editTitle={editTitle}
					editDescription={editDescription}
					setEditTitle={setEditTitle}
					setEditDescription={setEditDescription}
					onSave={handleSave}
					onCancel={() => setIsEditing(false)}
				/>
			) : (
				<TaskDisplay
					task={task}
					onDelete={() => deleteTask(task.id)}
					onEdit={() => setIsEditing(true)}
					onToggleComplete={() => toggleComplete(task.id)}
				/>
			)}

			{!task.isCompleted && (
				<CountdownTimer
					task={task}
					setCountdown={setCountdown}
					resetCountdown={resetCountdown}
				/>
			)}
		</div>
	);
}
