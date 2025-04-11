import React, { useMemo } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "../TaskCard";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const ContTasks = useMemo(() => {
    return (
      <p className="text-label text-sm">
        {`${tasks.length} ${tasks.length <= 1 ? "tarefa" : "tarefas"}`}
      </p>
    );
  }, [tasks.length]);

  return (
    <div ref={setNodeRef} style={style} className="flex flex-col min-w-80">
      <div className="flex flex-col gap-2">
        <p
          {...attributes}
          {...listeners}
          className="grid-cols-1 text-lg font-semibold items-center"
        >
          {column.title}
        </p>
        {ContTasks}
      </div>
      <ScrollArea className="h-[60dvh] rounded-3xl">
        <div className="flex flex-col gap-3 pt-2">
          <SortableContext items={tasksId}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} columnId={column.id} />
            ))}
          </SortableContext>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ColumnContainer;
