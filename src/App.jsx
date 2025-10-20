import AddTask from "../components/addTasks/AddTask";
import TaskList from "../components/taskList/TaskList";
import { TaskProvider } from "../context/TaskProvider";

const App = () => {
	return (
		<div className="container">
			<div className="to-do-app">
				<TaskProvider>
					<AddTask />
					<TaskList />
				</TaskProvider>
			</div>
		</div>
	);
};

export default App;
