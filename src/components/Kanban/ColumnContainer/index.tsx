import React, { useMemo } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "../TaskCard";

interface ColumnContainerProps {
  column: Column;
  tasks: Task[];
}

const ColumnContainer: React.FC<ColumnContainerProps> = ({ column, tasks }) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: column.id,
      data: { type: "Column", column },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const tasksId = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  return (
    <div ref={setNodeRef} style={style} className="gap-3">
      <p
        {...attributes}
        {...listeners}
        className="grid-cols-1 text-lg font-semibold items-center p-4"
      >
        {column.title}
      </p>
      <div className="flex flex-col gap-3">
        <SortableContext items={tasksId}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default ColumnContainer;
