import { useState, useEffect } from "react";
import Task from "src/types/Task";
import { useLocalStorage } from "src/hooks/useLocalStorage";

function useTask() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    if (tasks.length === 0) {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((data) => setTasks(data));
    }
  }, [tasks, setTasks]);

  const saveTask = (task: Task) => {
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tasked Saved to API", data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObject: Task = {
        userId: 1,
        id: tasks.length + 1,
        title: newTask,
        completed: false,
      };

      saveTask(newTaskObject);

      setTasks([newTaskObject, ...tasks]);
      setNewTask("");
    }
  };

  const removeTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleComplete = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return {
    newTask,
    setNewTask,
    tasks,
    setTasks,
    addTask,
    removeTask,
    toggleComplete,
  };
}

export default useTask;
