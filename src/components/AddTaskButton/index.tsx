import React from "react";
import { Button } from "../ui/button";

const AddTaskButton: React.FC = () => {
  return (
    <div className="bg-white py-4 px-6 w-fit rounded-b-2xl shadow-[0px_4px_14px_0px_rgba(231,_237,_240,_0.3)]">
      <Button className="bg-main rounded-[99px]">
        <p className="font-normal text-sm">Adicionar tarefa</p>
      </Button>
    </div>
  );
};

export default AddTaskButton;
