import { useEffect, useState } from "react";
import AddTaskButton from "./components/AddTaskButton";
import CarouselButtons from "./components/CarouselButtons";
import Header from "./components/Header";
import Kanban from "./components/Kanban";
import { FormTaskValues } from "./components/AddTaskButton/FormTask";
import useStartTasks from "./hooks/StartTasks";
import { useQuery } from "react-query";
import { ColumnIdByStatusMap } from "./lib/enums";
import { Spinner } from "./components/ui/spinner";
import { generateId } from "./lib/helpers";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { getTasks } = useStartTasks();

  const fetchTasks = useQuery(["tasks"], getTasks);

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

  const createTask = (values: FormTaskValues) => {
    const newTask: Task = {
      id: generateId(),
      columnId: 1,
      ...values,
    };

    setTasks([...tasks, newTask]);
  };

  return (
    <div className="bg-main-background min-h-screen py-6 px-7 lg:px-14 2xl:px-28">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-center items-center">
          <Header />
          <AddTaskButton createTask={createTask} />
        </div>
        <div className="flex flex-col gap-4">
          <CarouselButtons />
          <div className="max-w-dvw overflow-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-input">
            {fetchTasks.isLoading ? (
              <div>
                <Spinner />
              </div>
            ) : (
              <Kanban setTasks={setTasks} tasks={tasks} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
