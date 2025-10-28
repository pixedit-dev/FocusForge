import { useState, useEffect } from "react";
import TaskEditForm from "./TaskEditForm";
import TaskDisplay from "./TaskDisplay";
import CountdownTimer from "./CountdownTimer";

export default function TaskItem({
	task,
	editingTaskId,
	editTitle,
	editDescription,
	setEditTitle,
	setEditDescription,
	handleEditClick,
	handleSaveClick,
	cancelEditMode,
	deleteTask,
	toggleComplete,
	setCountdown,
	resetCountdown,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [, forceUpdate] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			forceUpdate((n) => n + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className={`task-list ${task.isCompleted ? "completed" : ""}`}>
			{editingTaskId === task.id ? (
				<TaskEditForm
					editTitle={editTitle}
					editDescription={editDescription}
					setEditTitle={setEditTitle}
					setEditDescription={setEditDescription}
					onSave={() => handleSaveClick(task.id)}
					onCancel={cancelEditMode}
				/>
			) : (
				<TaskDisplay
					task={task}
					onDelete={() => deleteTask(task.id)}
					onEdit={() => handleEditClick(task)}
					onToggleComplete={() => toggleComplete(task.id)}
				/>
			)}

			<CountdownTimer
				task={task}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				setCountdown={setCountdown}
				resetCountdown={resetCountdown}
			/>
		</div>
	);
}
