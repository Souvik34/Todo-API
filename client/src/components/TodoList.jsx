// src/components/TodoList.js
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
    <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-xl max-w-xl mx-auto mt-12 shadow-lg text-white transition-all duration-500">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Todos</h2>
      <div className="flex mb-4">
        <input
          className="flex-1 px-4 py-2 rounded-l bg-white bg-opacity-30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r transition"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`bg-white bg-opacity-20 px-4 py-2 rounded flex justify-between items-center shadow-sm transition-all duration-300 ${
              animatingId === todo.id ? 'opacity-0 scale-95' : 'opacity-100'
            }`}
          >
            <span>{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
