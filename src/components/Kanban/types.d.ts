type Id = string | number;

interface Column {
  id: Id;
  title: string;
}

interface Task {
  id: Id;
  columnId: Id;
  title: string;
  responsible: Array<string>;
  dueDate: Moment;
  description: string;
}

interface ApiTask extends Task {
  status: StartTasksStatus;
}
