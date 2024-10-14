import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface CategoryManagerProps {
  categories: string[];
  onAddCategory: (category: string) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, onAddCategory }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Categories</h3>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category"
          className="flex-grow p-2 border rounded-l"
        />
        <button type="submit" className="p-2 bg-green-500 text-white rounded-r flex items-center">
          <Plus size={18} className="mr-1" /> Add
        </button>
      </form>
      <div className="mt-2 flex flex-wrap">
        {categories.map((category) => (
          <span key={category} className="bg-gray-200 rounded px-2 py-1 m-1 text-sm">
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;