import Navbar from '../components/Navbar';
import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-600 via-pink-500 to-red-500 p-4">
      <Navbar />
      <TodoList />
    </div>
  );
}
