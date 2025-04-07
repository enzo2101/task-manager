import AddTaskButton from "./components/AddTaskButton";
import CarouselButtons from "./components/CarouselButtons";
import Header from "./components/Header";
import Kanban from "./components/Kanban";

function App() {
  return (
    <div className="bg-main-background h-dvh py-6 px-28">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-center items-center">
          <Header />
          <AddTaskButton />
        </div>
        <div className="flex flex-col gap-4">
          <CarouselButtons />
          <Kanban />
        </div>
      </div>
    </div>
  );
}

export default App;
