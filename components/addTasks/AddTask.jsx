import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import Clock from "../../utils/clock";
import "./add-task.css";

const AddTask = () => {
	const { addTask } = useContext(TaskContext);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		if (title.trim() && description.trim()) {
			addTask(title, description);
			setTitle("");
			setDescription("");
		}
	}

	return (
		<form className="header" onSubmit={handleSubmit}>
			<div className="welcome-context">
				<h2>
					Welcome to <span className="app-name">FocusForge</span>
				</h2>
				<div>
					<Clock />
				</div>
			</div>

			<div className="inputs">
				<div className="title">
					<p>Title</p>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Add Title"
					/>
				</div>
				<div className="task">
					<p>Description</p>
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Description..."
					/>
				</div>
			</div>
			{title.length > 0 || description.length > 0 ? (
				<button onClick={handleSubmit}>Add Task</button>
			) : null}
		</form>
	);
};

export default AddTask;
