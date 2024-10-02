import { Task } from "../interfaces/Task";

export interface FirestoreDocument {
  createdAt: Date;
  createdByEmail: string;
  createdByName: string;
  description: string;
  members: string[];
  name: string;
  tasks: Task[];
  technologies: string[];
  uid: string;
}

export interface Project {
  project: FirestoreDocument | null;
}
