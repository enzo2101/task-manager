import { useState } from "react";
import AddTaskButton from "./components/AddTaskButton";
import CarouselButtons from "./components/CarouselButtons";
import Header from "./components/Header";
import Kanban from "./components/Kanban";
import { FormTaskValues } from "./components/AddTaskButton/FormTask";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };

  const createTask = (task: FormTaskValues) => {
    const newTask: Task = {
      id: generateId(),
      columnId: 1,
      title: task.title,
      description: task.description,
      responsible: task.responsible,
      dueDate: task.dueDate,
    };

    setTasks([...tasks, newTask]);
  };

  return (
    <div className="bg-main-background h-dvh py-6 px-28">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-center items-center">
          <Header />
          <AddTaskButton createTask={createTask} />
        </div>
        <div className="flex flex-col gap-4">
          <CarouselButtons />
          <Kanban setTasks={setTasks} tasks={tasks} />
        </div>
      </div>
    </div>
  );
}

export default App;
