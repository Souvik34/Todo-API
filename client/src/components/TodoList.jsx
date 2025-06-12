import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import EditTodoModal from './EditTodoModal';
import DeleteConfirm from './DeleteConfirm';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [todoToDelete, setTodoToDelete] = useState(null); // For modal confirmation

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

  const confirmDelete = async () => {
    if (!todoToDelete) return;
    try {
      await api.delete(`/todos/${todoToDelete.id}`);
      toast.success('Todo deleted');
      setTodos(prev => prev.filter(todo => todo.id !== todoToDelete.id));
    } catch {
      toast.error('Failed to delete todo');
    } finally {
      setTodoToDelete(null);
    }
  };

  const handleEditSave = async (updatedTodo) => {
    try {
      const res = await api.put(`/todos/${updatedTodo.id}`, updatedTodo);
      toast.success('Todo updated');
      setTodos(prev =>
        prev.map(todo =>
          todo.id === updatedTodo.id ? res.data.todo ?? updatedTodo : todo
        )
      );
      setSelectedTodo(null);
    } catch {
      toast.error('Failed to update todo');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto text-white animate-fadeIn">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight">Your Todos</h2>
          <Link
            to="/todos/add"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 hover:shadow-lg hover:shadow-green-400/30 text-white px-4 py-2 rounded-lg shadow transition duration-300"
          >
            <FaPlus /> Add Todo
          </Link>
        </div>

        {!todos.length ? (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-semibold mb-4">No Todos Found</h2>
            <Link
              to="/todos/add"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 hover:shadow-md hover:shadow-white/40 px-6 py-3 rounded-lg text-lg font-semibold transition"
            >
              <FaPlus /> Add Todo
            </Link>
          </div>
        ) : (
          <ul className="space-y-5">
            {todos.map((todo, index) => (
              <li
                key={todo.id || todo._id}
                className="bg-white/10 hover:bg-white/20 backdrop-blur p-5 rounded-xl shadow-lg flex justify-between items-start gap-4 transition-transform duration-300 hover:scale-[1.015] animate-slideUp"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xl font-semibold ${todo.isCompleted ? 'line-through text-gray-400' : 'text-white'}`}>
                      {todo.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        todo.isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-yellow-400 text-gray-900'
                      }`}
                    >
                      {todo.isCompleted ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                  {todo.description && (
                    <p className="text-white/90 mt-1">{todo.description}</p>
                  )}
                  <p className="text-sm text-white/60 mt-2">
                    Created: {new Date(todo.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-3 pt-1">
                  <button
                    onClick={() => setSelectedTodo(todo)}
                    title="Edit"
                    className="text-blue-300 hover:text-blue-500 transition"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => setTodoToDelete(todo)}
                    title="Delete"
                    className="text-red-300 hover:text-red-500 transition"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {selectedTodo && (
          <EditTodoModal
            todo={selectedTodo}
            onClose={() => setSelectedTodo(null)}
            onSave={handleEditSave}
          />
        )}

        {todoToDelete && (
          <DeleteConfirm
            onConfirm={confirmDelete}
            onCancel={() => setTodoToDelete(null)}
          />
        )}
      </div>
    </div>
  );
}
