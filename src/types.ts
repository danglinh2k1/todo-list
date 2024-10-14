export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
  category?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Category {
  id: string;
  name: string;
}