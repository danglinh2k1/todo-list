import React from 'react';
import { Todo } from '../types';
import { PieChart, CheckCircle, XCircle, Clock } from 'lucide-react';

interface StatisticsProps {
  todos: Todo[];
}

const Statistics: React.FC<StatisticsProps> = ({ todos }) => {
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.length - completed;
  const overdue = todos.filter((todo) => todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed).length;

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <PieChart size={20} className="mr-2" /> Statistics
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-500 flex items-center justify-center">
            <CheckCircle size={24} className="mr-2" /> {completed}
          </p>
          <p className="text-sm text-gray-600">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-500 flex items-center justify-center">
            <Clock size={24} className="mr-2" /> {pending}
          </p>
          <p className="text-sm text-gray-600">Pending</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-500 flex items-center justify-center">
            <XCircle size={24} className="mr-2" /> {overdue}
          </p>
          <p className="text-sm text-gray-600">Overdue</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;