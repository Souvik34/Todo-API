import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditTodoModal from './EditTodoModal';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await api.get('/todos');
      setTodos(res.data);
    } catch {
      toast.error('Failed to fetch todos');
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this todo?');
    if (!confirm) return;

    try {
      await api.delete(`/todos/${id}`);
      toast.success('Todo deleted');
      setTodos(todos.filter(todo => todo.id !== id));
    } catch {
      toast.error('Failed to delete todo');
    }
  };

  const handleEditSave = async (updatedTodo) => {
    try {
      const res = await api.put(`/todos/${updatedTodo.id}`, updatedTodo);
      toast.success('Todo updated');
      setTodos(todos.map(todo => todo.id === updatedTodo.id ? res.data : todo));
      setSelectedTodo(null);
    } catch {
      toast.error('Failed to update todo');
    }
  };

  if (!todos.length) {
    return (
      <div className="text-center mt-20 text-white">
        <h2 className="text-3xl font-semibold mb-4">No Todos Found</h2>
        <Link
          to="/todos/add"
          className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg text-lg font-semibold"
        >
          ➕ Add Todo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <Link
          to="/todos/add"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
        >
          ➕ Add Todo
        </Link>
      </div>

      <ul className="space-y-4">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="bg-white/20 p-4 rounded-xl shadow-md flex justify-between items-start gap-4"
          >
            <div className="flex-1">
              <h3 className={`text-xl font-semibold ${todo.isCompleted ? 'line-through text-gray-300' : ''}`}>
                {todo.title}
              </h3>
              <p className="text-white/90">{todo.description}</p>
              <p className="text-sm text-white/60 mt-1">
                Created: {new Date(todo.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setSelectedTodo(todo)}
                title="Edit"
                className="text-blue-300 hover:text-blue-500"
              >
                <FaEdit size={18} />
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                title="Delete"
                className="text-red-300 hover:text-red-500"
              >
                <FaTrash size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedTodo && (
        <EditTodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
}
