import { useState } from "react";
import { TaskContext } from "./TaskContext";
import PropTypes from "prop-types";

TaskProvider.propTypes = {
	children: PropTypes.node,
};

export function TaskProvider({ children }) {
	const [tasks, setTasks] = useState([]);

	function addTask(taskTitle, taskDescription) {
		const newTask = {
			id: Date.now(),
			title: taskTitle,
			description: taskDescription,
			isCompleted: false,
		};
		setTasks([...tasks, newTask]);
	}

	function deleteTask(id) {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this task?"
		);

		if (confirmDelete) {
			setTasks(tasks.filter((task) => task.id !== id));
		}
	}

	return (
		<TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
			{children}
		</TaskContext.Provider>
	);
}
