import { Icon } from "iconsax-react";
import React from "react";

interface TaskSubButtonProps {
  icon: Icon;
  color: string;
  onClick: () => void;
}

const TaskSubButton: React.FC<TaskSubButtonProps> = ({
  icon: Icon,
  color,
  onClick,
}) => {
  return (
    <Icon
      className="hover:cursor-pointer"
      size={20}
      color={color}
      onClick={onClick}
    />
  );
};

export default TaskSubButton;
