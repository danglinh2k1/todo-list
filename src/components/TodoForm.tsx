import React, { useState, useEffect } from 'react';
import { Plus, Save } from 'lucide-react';
import { Todo } from '../types';

interface TodoFormProps {
  onAdd: (title: string, dueDate: Date | undefined, category: string, priority: 'low' | 'medium' | 'high') => void;
  onUpdate: (todo: Todo) => void;
  categories: string[];
  editingTodo: Todo | null;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd, onUpdate, categories, editingTodo }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDueDate(editingTodo.dueDate ? new Date(editingTodo.dueDate).toISOString().split('T')[0] : '');
      setCategory(editingTodo.category || '');
      setPriority(editingTodo.priority);
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      if (editingTodo) {
        onUpdate({
          ...editingTodo,
          title,
          dueDate: dueDate ? new Date(dueDate) : undefined,
          category,
          priority,
        });
      } else {
        onAdd(title, dueDate ? new Date(dueDate) : undefined, category, priority);
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle('');
    setDueDate('');
    setCategory('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/3 px-2 mb-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/6 px-2 mb-2">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/6 px-2 mb-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-1/6 px-2 mb-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="w-full p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="w-full md:w-1/6 px-2 mb-2">
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded flex items-center justify-center">
            {editingTodo ? (
              <>
                <Save size={18} className="mr-1" /> Update
              </>
            ) : (
              <>
                <Plus size={18} className="mr-1" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;