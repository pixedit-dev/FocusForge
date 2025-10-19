import AddTask from "../components/addTasks/AddTask";
import TaskList from "../components/taskList/TaskList";

const App = () => {
	return (
		<div className="container">
			<div className="to-do-app">
				<AddTask />
				<TaskList />
			</div>
		</div>
	);
};

export default App;
