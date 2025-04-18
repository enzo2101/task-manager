import { useSortable } from "@dnd-kit/sortable";
import React, { useMemo, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import moment from "moment";
import { cn } from "@/lib/utils";
import TaskModal from "../TaskModal";
import { ArchiveTick, Trash } from "iconsax-react";
import { ThemeColors } from "@/lib/enums";
import TaskSubButton from "./TaskSubButton";
import { useTasks } from "@/contexts/Tasks";

interface TaskCardProps {
  task: Task;
  className?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const { handleDeleteTask, updateTask } = useTasks();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "Task", task },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const isTaskCompleted = task.columnId === 4;

  useMemo(() => {
    if (isTaskCompleted) {
      updateTask(task.id);
    }
  }, [isTaskCompleted, task.id]);

  const renderDaysRemaining = useMemo(() => {
    const today = moment().startOf("day");
    const finalDay = moment(task.dueDate).startOf("day");
    const diff = finalDay.diff(today, "days");

    const verifyMultipleDays =
      Math.abs(diff) === 1 ? `${Math.abs(diff)} dia` : `${Math.abs(diff)} dias`;

    return (
      <p
        className={cn("p-2 text-xs font-semibold", {
          "text-success":
            (task.doneDate &&
              moment(task.doneDate).isSameOrBefore(task.dueDate)) ||
            (!task.doneDate && diff >= 10),

          "text-error":
            (task.doneDate && moment(task.doneDate).isAfter(task.dueDate)) ||
            (!task.doneDate && diff <= 2),

          "text-danger": !task.doneDate && diff < 10 && diff > 2,
        })}
      >
        {task.doneDate
          ? moment(task.doneDate).isSameOrBefore(task.dueDate)
            ? "Finalizado dentro do prazo"
            : "Finalizado fora do prazo"
          : diff >= 0
          ? `Faltam ${verifyMultipleDays}`
          : `Atrasado há ${verifyMultipleDays}`}
      </p>
    );
  }, [task.doneDate, task.dueDate]);

  if (isDragging) {
    return (
      <div
        className={
          "bg-white p-6 rounded-3xl flex flex-col gap-4 shadow-[0px_4px_14px_0px_rgba(231,_237,_240,_0.3)] h-fit min-w-80 relative opacity-30"
        }
        ref={setNodeRef}
        style={style}
        onClick={() => setIsModalOpen(true)}
        {...attributes}
        {...listeners}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-base font-semibold">{task.title}</h1>
          <div className="h-10">
            <p className="text-sm text-label line-clamp-2">
              {task.description}
            </p>
          </div>
        </div>
        <div className="border border-label border-dashed rounded-xl flex justify-between">
          <p className="p-2 text-xs text-label">
            Data limite: {moment(task.dueDate).format("DD/MM/YYYY")}
          </p>
          {renderDaysRemaining}
        </div>
        <div className="flex gap-2">
          {task.responsible.map((responsible) => (
            <p
              key={responsible}
              className="bg-secound rounded-lg p-2 text-white text-center text-xs w-fit h-fit"
            >
              {responsible}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "bg-white p-6 rounded-3xl flex flex-col gap-4 shadow-[0px_4px_14px_0px_rgba(231,_237,_240,_0.3)] h-fit min-w-80 relative cursor-grab",
          { "border border-success": isTaskCompleted },
          className
        )}
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        ref={setNodeRef}
        style={style}
        onClick={() => setIsModalOpen(true)}
        {...attributes}
        {...listeners}
      >
        {isTaskCompleted && (
          <ArchiveTick
            size={30}
            color={ThemeColors.SUCCESS}
            variant="Bold"
            className="absolute top-[-5px] left-5.5"
          />
        )}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-semibold">{task.title}</h1>
            {mouseIsOver && (
              <TaskSubButton
                icon={Trash}
                onClick={() => handleDeleteTask(task.id)}
                color={ThemeColors.ERROR}
                className="opacity-60 hover:opacity-100"
              />
            )}
          </div>
          <div className="h-10">
            <p className="text-sm text-label line-clamp-2">
              {task.description}
            </p>
          </div>
        </div>
        <div className="border border-label border-dashed rounded-xl flex justify-between">
          <p className="p-2 text-xs text-label">
            Data limite: {moment(task.dueDate).format("DD/MM/YYYY")}
          </p>
          {renderDaysRemaining}
        </div>
        <div className="flex gap-2">
          {task.responsible.map((responsible) => (
            <p className="bg-secound rounded-lg p-2 text-white text-center text-xs w-fit h-fit">
              {responsible}
            </p>
          ))}
        </div>
      </div>
      <TaskModal
        task={task}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TaskCard;
