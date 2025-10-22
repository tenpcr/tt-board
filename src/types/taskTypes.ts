export interface DrawerTaskType {
  _id: string;
  title: string;
  type?: { _id: string; name: string };
  description: string;
  status: { _id: string; name: string };
  due_date?: string;
  created_at: string;
}

export interface DrawerTaskProps {
  onReload: () => void;
}

export interface TaskTypeState {
  _id: string;
  name: string;
}

export interface DrawerAddNewTaskProps {
  show: boolean;
  onAddSuccess: () => void;
  onClose: () => void;
}

export interface DrawerTaskInputDataTypes {
  title: string;
  type: { label: string; value: string };
  dueDate: string;
  description: string;
}
