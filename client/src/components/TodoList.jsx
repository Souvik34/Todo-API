import { useState, useEffect } from 'react';
import api from '../api';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [animatingId, setAnimatingId] = useState(null);

  useEffect(() => {
    api.get('/todos').then(res => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await api.post('/todos', { text });
    setTodos([...todos, res.data]);
    setText('');
  };

  const deleteTodo = async (id) => {
    setAnimatingId(id);
    setTimeout(async () => {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    }, 300);
  };

  return (
    <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl max-w-2xl mx-auto mt-16 shadow-2xl transition-all duration-500 text-white">
      <h2 className="text-3xl font-extrabold mb-6 text-center tracking-wide drop-shadow-sm">📝 Your Todo List</h2>

      <div className="flex items-center mb-6">
        <input
          className="flex-1 px-5 py-3 rounded-l-lg bg-white/30 placeholder-white text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-lg text-white font-semibold transition-all"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`bg-white/25 px-5 py-3 rounded-xl flex justify-between items-center shadow-md transition-all duration-300 ease-in-out ${
              animatingId === todo.id ? 'opacity-0 scale-95' : 'opacity-100'
            }`}
          >
            <span className="text-lg font-medium">{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-md font-medium transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
