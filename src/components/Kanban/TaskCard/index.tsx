import { useSortable } from "@dnd-kit/sortable";
import React, { useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import moment from "moment";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
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

  if (isDragging) {
    return <div ref={setNodeRef} style={style} />;
  }

  return (
    <div
      className="bg-white p-6 rounded-3xl flex flex-col gap-4 shadow-[0px_4px_14px_0px_rgba(231,_237,_240,_0.3)]"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-base font-semibold">{task.title}</h1>
        <p className="text-sm text-label">{task.description}</p>
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
};

export default TaskCard;
