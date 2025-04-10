import { useEffect, useState } from "react";
import AddTaskButton from "./components/AddTaskButton";
import CarouselButtons from "./components/CarouselButtons";
import Header from "./components/Header";
import Kanban from "./components/Kanban";
import { FormTaskValues } from "./components/AddTaskButton/FormTask";
import useStartTasks from "./hooks/StartTasks";
import { useQuery } from "react-query";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { getTasks } = useStartTasks();

  const fetchTasks = useQuery(["tasks"], getTasks);

  enum StartTasksStatus {
    BACKLOG = "backlog",
    TODO = "todo",
    DOING = "doing",
    DEVELOPED = "developed",
  }

  const ColumnIdByStatusMap = {
    [StartTasksStatus.BACKLOG]: 1,
    [StartTasksStatus.TODO]: 2,
    [StartTasksStatus.DOING]: 3,
    [StartTasksStatus.DEVELOPED]: 4,
  };

  useEffect(() => {
    if (fetchTasks.data) {
      const tasksWithColumnId = fetchTasks.data.map((task) => ({
        ...task,
        columnId:
          ColumnIdByStatusMap[task.status as keyof typeof ColumnIdByStatusMap],
      }));
      setTasks(tasksWithColumnId);
    }
  }, [fetchTasks.data]);

  console.log(fetchTasks.data);

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
    <div className="bg-main-background min-h-dvh h-full py-6 px-28">
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
