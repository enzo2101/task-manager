import { useSortable } from "@dnd-kit/sortable";
import React, { useMemo, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import moment from "moment";
import { cn } from "@/lib/utils";
import TaskModal from "../TaskModal";
import { ArchiveTick } from "iconsax-react";

interface TaskCardProps {
  task: Task;
  columnId?: Id;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, columnId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderDaysRemaining = useMemo(() => {
    const today = moment().startOf("day");
    const finalDay = moment(task.dueDate).startOf("day");
    const diff = finalDay.diff(today, "days");

    const verifyMultipleDays =
      Math.abs(diff) === 1 ? `${Math.abs(diff)} dia` : `${Math.abs(diff)} dias`;

    return (
      <p
        className={cn("p-2 text-xs font-semibold", {
          "text-success": diff >= 10,
          "text-danger": diff < 10 && diff > 2,
          "text-error": diff <= 2,
        })}
      >
        {diff >= 0
          ? `Faltam ${verifyMultipleDays}`
          : `Atrasado há ${verifyMultipleDays}`}
      </p>
    );
  }, [task.dueDate]);

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

  const isTaskCompleted = columnId === 4;

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
            <p className="bg-secound rounded-lg p-2 text-white text-center text-xs w-fit h-fit">
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
          "bg-white p-6 rounded-3xl flex flex-col gap-4 shadow-[0px_4px_14px_0px_rgba(231,_237,_240,_0.3)] h-fit min-w-80 relative cursor-grab focus:cursor-grabbing",
          { "border border-success": isTaskCompleted }
        )}
        ref={setNodeRef}
        style={style}
        onClick={() => setIsModalOpen(true)}
        {...attributes}
        {...listeners}
      >
        {isTaskCompleted && (
          <ArchiveTick
            size={30}
            color="#63b150"
            variant="Bold"
            className="absolute top-[-5px] left-5.5"
          />
        )}
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
