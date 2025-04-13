import { FormTaskValues } from "@/components/AddTaskButton/FormTask";
import useStartTasks from "@/hooks/StartTasks";
import { ColumnIdByStatusMap } from "@/lib/enums";
import { generateId } from "@/lib/helpers";
import moment from "moment";
import React, { useContext, createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";

interface TasksContextValues {
  setTasks: React.Dispatch<React.SetStateAction<Array<Task>>>;
  tasks: Array<Task>;
  handleDeleteTask: (id: Id) => void;
  createTask: (values: FormTaskValues) => void;
  isApiTasksLoading: boolean;
  updateTask: (id: Id) => void;
}

const TasksContext = createContext<TasksContextValues>(
  {} as TasksContextValues
);

interface TasksProviderProps {
  children: React.ReactNode;
}

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);

  const { getTasks } = useStartTasks();

  const fetchTasks = useQuery(["tasks"], getTasks);

  useEffect(() => {
    if (fetchTasks.data) {
      const tasksWithColumnId = fetchTasks.data.map((task) => {
        const columnId =
          ColumnIdByStatusMap[task.status as keyof typeof ColumnIdByStatusMap];

        const doneDate =
          columnId === 4 && !task.doneDate
            ? moment().toISOString()
            : task.doneDate;

        return {
          ...task,
          columnId,
          doneDate,
        };
      });

      setTasks(tasksWithColumnId);
    }
  }, [fetchTasks.data]);

  const handleDeleteTask = (id: Id) => {
    const deleteTask = tasks.filter((task) => task.id !== id);

    setTasks(deleteTask);
  };

  const createTask = (values: FormTaskValues) => {
    const newTask: Task = {
      id: generateId(),
      columnId: 1,
      doneDate: undefined,
      ...values,
    };

    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: Id) => {
    const updateTask = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, doneDate: moment().toISOString() };
    });

    setTasks(updateTask);
  };

  return (
    <TasksContext.Provider
      value={{
        setTasks,
        tasks,
        handleDeleteTask,
        createTask,
        isApiTasksLoading: fetchTasks.isLoading,
        updateTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  return context;
};
