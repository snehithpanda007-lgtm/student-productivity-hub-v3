export interface Task {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export interface Activity {
  id: string;
  text: string;
  createdAt: string;
}