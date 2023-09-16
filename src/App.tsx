import useTask from "src/hooks/useTasks";
import "src/App.css";

const App: React.FC = () => {
  const { tasks, addTask, removeTask, toggleComplete, newTask, setNewTask } =
    useTask();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setNewTask(e.target.value);
  };

  return (
    <div className="App">
      <ul className="sidebar">
        {tasks.reverse().map((task) => (
          <li key={task.id}>
            <div className="task-wrap">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              {task.title}
            </div>
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="content">
        <div className="input-wrap">
          <textarea
            placeholder="Add a new task"
            value={newTask}
            onChange={handleChange}></textarea>
          <button onClick={addTask}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default App;
