export interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  createdByName: string | null;
  createdByEmail: string | null;
  assignedTo: string;
  createdAt: Date;
}
