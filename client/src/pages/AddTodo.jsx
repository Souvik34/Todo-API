import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';

export default function AddTodo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim()) return toast.error('Title is required');
    try {
      await api.post('/todos/create-todo', { title, description, isCompleted });
      toast.success('Todo created');
      navigate('/todos');
    } catch {
      toast.error('Failed to create todo');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-800 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white/20 backdrop-blur-lg text-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">➕ Add New Todo</h2>
        <input
          className="w-full mb-4 p-3 rounded bg-white/30 text-white"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-4 p-3 rounded bg-white/30 text-white"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => setIsCompleted((prev) => !prev)}
          />
          Completed
        </label>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          onClick={handleSubmit}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}
