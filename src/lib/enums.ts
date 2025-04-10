enum StartTasksStatus {
  BACKLOG = "backlog",
  DEVELOPMENT = "development",
  DOING = "doing",
  DEVELOPED = "developed",
}

export const ColumnIdByStatusMap = {
  [StartTasksStatus.BACKLOG]: 1,
  [StartTasksStatus.DEVELOPMENT]: 2,
  [StartTasksStatus.DOING]: 3,
  [StartTasksStatus.DEVELOPED]: 4,
};
