/* eslint-disable @typescript-eslint/no-explicit-any */
export type DrawerTaskType = {
  _id?: string;
  title?: string;
  type?: { _id: string; name: string };
  description?: string;
  status?: { _id: string; name: string };
  due_date?: string;
  created_at?: string;
};

export type DrawerTaskProps = {
  onReload: () => void;
};

export type TaskTypeState = {
  _id: string;
  name: string;
};

export type TaskNewType = {
  title?: string;
  description?: string;
  due_date?: string;
  type?: {
    _id?: string;
    label?: string;
  };
};

export type DrawerAddNewTaskProps = {
  show: boolean;
  onAddSuccess: () => void;
  onClose: () => void;
};

export type DrawerTaskInputDataTypes = {
  title: string;
  type: { label: string; value: string };
  dueDate: string;
  description: string;
};

export type EditTaskProps = {
  task?: DrawerTaskType;
  task_id?: string;
  setTaskNew: (updater: (draft: TaskNewType) => void) => void;
  onCancel: () => void;
  toSave: () => void;
  alert?: AlertType;
  handleCloseDrawer?: () => void;
};

export type InputCKeditorProps = {
  value: string | undefined;
  onChange: (newValue: string) => void;
  height?: number;
  resize?: number;
  onReady?: any;
};

export type AlertType = {
  title?: string | undefined;
};