import type React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import moment from "moment";
import { cn } from "@/lib/utils";
import { formatResponsibleNames } from "@/lib/helpers";

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose }) => {
  if (!task) return null;

  const today = moment().startOf("day");
  const finalDay = moment(task.dueDate).startOf("day");
  const diff = finalDay.diff(today, "days");
  const verifyMultipleDays =
    Math.abs(diff) === 1 ? `${Math.abs(diff)} dia` : `${Math.abs(diff)} dias`;

  const daysRemainingClass = cn({
    "text-success": diff >= 10,
    "text-danger": diff < 10 && diff > 2,
    "text-error": diff <= 2,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="grid gap-4 py-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <DialogTitle className="text-base font-semibold">
                {task.title}
              </DialogTitle>
              <div className="flex ">
                <p className="text-xs text-label"> </p>
                <p className="rounded-lg text-xs text-label">
                  Responsáveis: {formatResponsibleNames(task.responsible)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className={`text-xs font-semibold ${daysRemainingClass}`}>
                {diff >= 0
                  ? `Faltam ${verifyMultipleDays}`
                  : `Atrasado há ${verifyMultipleDays}`}
              </p>
              <div className="border border-label border-dashed rounded-lg flex justify-between p-2 w-fit">
                <p className="text-xs text-label">
                  {moment(task.dueDate).format("DD/MM")}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-box rounded-xl p-4 max-h-40 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-input">
            <p className="text-sm text-label">{task.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
