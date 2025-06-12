import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import { FaPlusCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-800 text-white">
      <Navbar />
      <div className="flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white/20 backdrop-blur-md text-white p-8 rounded-2xl shadow-xl mt-8">
          <div className="flex items-center gap-2 mb-6">
            <FaPlusCircle className="text-3xl text-white" />
            <h2 className="text-2xl font-bold">Add New Todo</h2>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              className="w-full p-3 rounded bg-white/30 placeholder-white/70 text-black focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full p-3 rounded bg-white/30 placeholder-white/70 text-black resize-none focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Description (optional)"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label className="flex items-center gap-3 text-sm text-white">
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => setIsCompleted(prev => !prev)}
                className="accent-purple-600 w-4 h-4"
              />
              Mark as completed
            </label>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              <div className="flex items-center justify-center gap-2">
                <FaPlusCircle className="text-lg" />
                <span>Add Todo</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
