import React, { useMemo, useState } from "react";
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";
import { createPortal } from "react-dom";

interface Kanban {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  tasks: Task[];
}

const Kanban: React.FC<Kanban> = ({ setTasks, tasks }) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const columns = useMemo(() => {
    return [
      { id: 1, title: "Ideias" },
      { id: 2, title: "A fazer" },
      { id: 3, title: "Fazendo" },
      { id: 4, title: "Feito" },
    ];
  }, []);

  const columnsId = useMemo(() => columns.map(({ id }) => id), [columns]);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  return (
    <div className="min-w-screen grid grid-cols-4 horizontal gap-4">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
      >
        <SortableContext items={columnsId}>
          {columns.map((column) => (
            <ColumnContainer
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.columnId === column.id)}
            />
          ))}
        </SortableContext>
        {createPortal(
          <DragOverlay>
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default Kanban;
