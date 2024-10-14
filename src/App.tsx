import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CategoryManager from './components/CategoryManager';
import Statistics from './components/Statistics';
import { Todo } from './types';
import { CheckSquare } from 'lucide-react';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [categories, setCategories] = useState<string[]>(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : ['Personal', 'Work', 'Shopping'];
  });
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sort, setSort] = useState<'priority' | 'dueDate'>('priority');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addTodo = (title: string, dueDate: Date | undefined, category: string, priority: 'low' | 'medium' | 'high') => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      dueDate,
      category,
      priority,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setEditingTodo(todoToEdit);
    }
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
    setEditingTodo(null);
  };

  const addCategory = (category: string) => {
    setCategories([...categories, category]);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sort === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    } else {
      return (a.dueDate && b.dueDate) ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() : 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
          <CheckSquare size={32} className="mr-2" /> TodoList App
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <TodoForm
              onAdd={addTodo}
              categories={categories}
              editingTodo={editingTodo}
              onUpdate={updateTodo}
            />
            <div className="mb-4 flex justify-between">
              <div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')}
                  className="p-2 border rounded mr-2"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as 'priority' | 'dueDate')}
                  className="p-2 border rounded"
                >
                  <option value="priority">Sort by Priority</option>
                  <option value="dueDate">Sort by Due Date</option>
                </select>
              </div>
            </div>
            <TodoList
              todos={sortedTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </div>
          <div>
            <Statistics todos={todos} />
            <CategoryManager categories={categories} onAddCategory={addCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;