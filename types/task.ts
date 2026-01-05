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
}

export interface AddTaskFormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
  load: () => Promise<void>;
}

export interface AddTaskFormProps {
  onClose: () => void;
  load: () => Promise<void>;
  task?: Task | null;
}

export interface TaskCardProps {
  task: Task;
  load: () => void;
  onEdit?: () => void;
}
export type HandleSelectChangeType = (
  key: string,
  newStatus: string,
  id: number
) => Promise<void>;

export type TaskPatchInput = Partial<{
  title: string;
  description: string | null;
  status: string;
  level: string | null;
  dueDate: Date | null;
}>;
