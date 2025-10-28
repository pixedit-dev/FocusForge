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
			time: {
				hour: 0,
				min: 0,
				active: false,
				targetTime: null,
			},
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

	const toggleComplete = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
			)
		);
	};

	const editTask = (id, updatedTitle, updatedDescription) => {
		setTasks(
			tasks.map((task) =>
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
							time: {
								hour,
								min,
								active: true,
								targetTime,
							},
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
							time: {
								hour: 0,
								min: 0,
								active: false,
								targetTime: null,
							},
					  }
					: task
			)
		);
	};

	return (
		<TaskContext.Provider
			value={{
				tasks,
				addTask,
				deleteTask,
				toggleComplete,
				editTask,
				setCountdown,
				resetCountdown,
			}}>
			{children}
		</TaskContext.Provider>
	);
}
