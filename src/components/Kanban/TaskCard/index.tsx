import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
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
      className="bg-white p-6"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>{task.dueDate.getDate()}</p>
      <p>{task.responsible}</p>
    </div>
  );
};

export default TaskCard;
