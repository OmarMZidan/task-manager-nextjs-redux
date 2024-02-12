interface ReduxProviderProps {
  children: React.ReactNode;
}

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
  filterBy: string;
}

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  type: "add" | "edit";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  taskInput?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TaskItemProps {
  task: Task;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickEdit: (e: React.MouseEvent<HTMLElement>) => void;
  onClickRemove: (e: React.MouseEvent<HTMLElement>) => void;
  onClickText: (e: React.MouseEvent<HTMLElement>) => void;
}
