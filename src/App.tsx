import AddTaskButton from "./components/AddTaskButton";
import Header from "./components/Header";
import Kanban from "./components/Kanban";
import { Spinner } from "./components/ui/spinner";
import { useTasks } from "./contexts/Tasks";

function App() {
  const { isApiTasksLoading } = useTasks();

  return (
    <div className="bg-main-background min-h-screen py-6 px-7 lg:px-14 2xl:px-28">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-center items-center">
          <Header />
          <AddTaskButton />
        </div>
        <div className="max-w-dvw overflow-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-input">
          {isApiTasksLoading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <Kanban />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
