import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaClock, FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';
import EditTodoModal from './EditTodoModal';
import DeleteConfirm from './DeleteConfirm';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    filterTodos();
  }, [todos, filter]);

  const fetchTodos = async () => {
    try {
      const res = await api.get('/todos');
      setTodos(res.data);
    } catch {
      toast.error('Failed to fetch todos');
    }
  };

  const filterTodos = () => {
    if (filter === 'completed') {
      setFiltered(todos.filter(todo => todo.isCompleted));
    } else if (filter === 'pending') {
      setFiltered(todos.filter(todo => !todo.isCompleted));
    } else {
      setFiltered(todos);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto text-white animate-fadeIn">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold tracking-tight drop-shadow-[0_1px_12px_rgba(255,255,255,0.3)] animate-fadeInUp">
            Your Todos
          </h2>

          <Link
            to="/todos/add"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 hover:shadow-lg hover:shadow-green-400/30 text-white px-4 py-2 rounded-lg shadow transition duration-300"
          >
            <FaPlus /> Add Todo
          </Link>
        </div>

        <div className="mb-6 flex gap-4 text-sm sm:text-base">
          {['all', 'completed', 'pending'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-lg transition font-medium ${
                filter === type
                  ? 'bg-white/20 text-white font-semibold'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {type[0].toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {!filtered.length ? (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-white drop-shadow-md mb-4">
              No Todos Found
            </h2>
          </div>
        ) : (
          <ul className="space-y-5">
            {filtered.map((todo, index) => (
              <li
                key={todo.id || todo._id}
                className="bg-white/10 hover:bg-white/20 backdrop-blur p-5 rounded-xl shadow-xl flex justify-between items-start gap-4 transition-transform duration-300 hover:scale-[1.02] animate-fadeInUp"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`text-xl font-bold ${
                      todo.isCompleted ? 'line-through text-gray-300' : 'text-white'
                    }`}>
                      {todo.title}
                    </h3>

                    <span className={`text-xs px-3 py-1 rounded-full font-semibold tracking-wide shadow-md flex items-center gap-1 ${
                      todo.isCompleted
                        ? 'bg-green-400 text-white shadow-green-500/50'
                        : 'bg-yellow-300 text-black shadow-yellow-500/40'
                    }`}>
                      {todo.isCompleted ? <FaCheckCircle /> : <FaClock />} {todo.isCompleted ? 'Completed' : 'Pending'}
                    </span>
                  </div>

                  {todo.description && (
                    <p className="mt-1 text-base text-white/90">{todo.description}</p>
                  )}

                  <p className="mt-2 text-sm text-white/70 font-semibold flex items-center gap-1">
                    <FaCalendarAlt /> {formatDate(todo.createdAt)}
                  </p>
                </div>

                <div className="flex space-x-3 pt-1">
                  <button
                    onClick={() => setSelectedTodo(todo)}
                    title="Edit"
                    className="text-blue-400 hover:text-blue-500 transition"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => setTodoToDelete(todo)}
                    title="Delete"
                    className="text-red-400 hover:text-red-500 transition"
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
            animated
          />
        )}

        {todoToDelete && (
          <DeleteConfirm
            onConfirm={confirmDelete}
            onCancel={() => setTodoToDelete(null)}
            animated
          />
        )}
      </div>
    </div>
  );
}
