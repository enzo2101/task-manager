import { cn } from "@/lib/utils";
import { Icon } from "iconsax-react";
import React from "react";

interface TaskSubButtonProps {
  icon: Icon;
  color: string;
  onClick: () => void;
  className?: string;
}

const TaskSubButton: React.FC<TaskSubButtonProps> = ({
  icon: Icon,
  color,
  onClick,
  className,
}) => {
  return (
    <Icon
      className={cn("hover:cursor-pointer", className)}
      size={20}
      color={color}
      onClick={onClick}
    />
  );
};

export default TaskSubButton;
