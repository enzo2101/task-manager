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
  responsible: string;
  dueDate: Date;
  description?: string | undefined;
}
