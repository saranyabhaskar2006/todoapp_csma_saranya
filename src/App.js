import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const getTasks = async () => {
    const response = await fetch("https://todoapp-csma-satya-1.onrender.com/api/todos");
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);


  const addTask = async (task) => {
    await fetch("https://todoapp-csma-satya-1.onrender.com/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });

    getTasks();
  };

  const toggleComplete = async (task) => {
    await fetch(`https://todoapp-csma-satya-1.onrender.com/api/todos/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !task.completed,
      }),
    });

    getTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`https://todoapp-csma-satya-1.onrender.com/api/todos/${id}`, {
      method: "DELETE",
    });

    getTasks();
  };

  return (
   <div className="container">
      <h1>Todo App</h1>

      <TaskForm addTask={addTask} />

      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;
