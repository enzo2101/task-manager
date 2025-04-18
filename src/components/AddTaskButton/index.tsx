import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormTask, { FormTaskValues } from "./FormTask";
import { useTasks } from "@/contexts/Tasks";

const AddTaskButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { createTask } = useTasks();

  const handleSubmit = (values: FormTaskValues) => {
    createTask(values);
    setOpen(false);
  };

  return (
    <div className="bg-white py-4 px-6 w-fit rounded-b-2xl shadow-[0px_4px_14px_0px_rgba(231,_237,_240,_0.3)]">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <p className="font-normal text-sm">Adicionar tarefa</p>
          </Button>
        </DialogTrigger>
        {open && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-medium">
                Adicionar tarefa
              </DialogTitle>
              <p className="text-xs">Preencha os detalhes da nova tarefa</p>
            </DialogHeader>
            <FormTask onSubmit={handleSubmit} />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default AddTaskButton;
