export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  level?: string | null;
  dueDate: string;
  createdAt: string;
}

export interface NewTask {
  title: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  dueDate: FormDataEntryValue | null;
  status: string;
}

export interface AddTaskFormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
  load: () => Promise<void>;
}

export interface AddTaskFormProps {
  onClose: () => void;
  load: () => Promise<void>;
}

export interface TaskCardProps {
  task: Task;
  load: () => void;
}
export type HandleSelectChangeType = (
  key: string,
  newStatus: string,
  id: number
) => Promise<void>;
