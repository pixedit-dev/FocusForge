import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TaskContext } from "./TaskContext";

export function TaskProvider({ children }) {
	const [tasks, setTasks] = useState(() => {
		const stored = localStorage.getItem("tasks");
		return stored ? JSON.parse(stored) : [];
	});

	const addTask = (taskTitle, taskDescription) => {
		setTasks((prevTasks) => [
			...prevTasks,
			{
				id: Date.now(),
				title: taskTitle,
				description: taskDescription,
				isCompleted: false,
				time: {
					hour: 0,
					min: 0,
					active: false,
					targetTime: null,
				},
			},
		]);
	};

	const deleteTask = (id) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this task?"
		);
		if (confirmDelete) {
			setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
		}
	};

	const toggleComplete = (id) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
			)
		);
	};

	const editTask = (id, updatedTitle, updatedDescription) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === id
					? { ...task, title: updatedTitle, description: updatedDescription }
					: task
			)
		);
	};

	const setCountdown = (id, hour, min) => {
		const now = Date.now();
		const duration = (hour * 60 + min) * 60 * 1000;
		const targetTime = now + duration;

		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === id
					? {
							...task,
							time: { hour, min, active: true, targetTime },
					  }
					: task
			)
		);
	};

	const resetCountdown = (id) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === id
					? {
							...task,
							time: { hour: 0, min: 0, active: false, targetTime: null },
					  }
					: task
			)
		);
	};

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	const contextValue = {
		tasks,
		addTask,
		deleteTask,
		toggleComplete,
		editTask,
		setCountdown,
		resetCountdown,
	};

	return (
		<TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
	);
}

TaskProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
