type Id = string | number;

enum Responsibles {
  PEDRO_PAULO = "",
}

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
  description?: string | undefined;
}
