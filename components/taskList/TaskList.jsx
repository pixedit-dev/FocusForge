import "./task-list.css";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
	const { tasks } = useContext(TaskContext);

	return (
		<div className="tasks-section">
			{tasks.length > 0 ? (
				tasks.map((task) => <TaskItem key={task.id} task={task} />)
			) : (
				<p className="task-status">
					Your tasks will appear here. You&apos;ve added no tasks yet!
				</p>
			)}
		</div>
	);
}
