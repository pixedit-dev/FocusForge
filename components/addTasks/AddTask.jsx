import "./add-task.css";

const AddTask = () => {
	return (
		<form className="header">
			<h2>
				Welcome to <span className="app-name">FocusForge</span>
			</h2>
			<div className="inputs">
				<div className="title">
					<p>Title</p>
					<input type="text" placeholder="Add Title" />
				</div>
				<div className="task">
					<p>Description</p>
					<input type="text" placeholder="Description..." />
				</div>
			</div>
			<button label="Add Task">Add Task</button>
		</form>
	);
};

export default AddTask;
