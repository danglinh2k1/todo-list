import React from 'react';
import { Check, Trash2, Edit } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  return (
    <li className={`flex items-center justify-between p-3 mb-2 rounded ${todo.completed ? 'bg-gray-200' : 'bg-white'}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mr-3"
        />
        <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.title}
        </span>
      </div>
      <div className="flex items-center">
        <span className={`mr-2 px-2 py-1 rounded text-xs ${
          todo.priority === 'high' ? 'bg-red-200 text-red-800' :
          todo.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
          'bg-green-200 text-green-800'
        }`}>
          {todo.priority}
        </span>
        {todo.dueDate && (
          <span className="mr-2 text-sm text-gray-600">
            {new Date(todo.dueDate).toLocaleDateString()}
          </span>
        )}
        <button onClick={() => onEdit(todo.id)} className="mr-2 text-blue-500">
          <Edit size={18} />
        </button>
        <button onClick={() => onDelete(todo.id)} className="text-red-500">
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;