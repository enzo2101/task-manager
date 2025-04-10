enum StartTasksStatus {
  BACKLOG = "backlog",
  TODO = "todo",
  DOING = "doing",
  DEVELOPED = "developed",
}

export const ColumnIdByStatusMap = {
  [StartTasksStatus.BACKLOG]: 1,
  [StartTasksStatus.TODO]: 2,
  [StartTasksStatus.DOING]: 3,
  [StartTasksStatus.DEVELOPED]: 4,
};
