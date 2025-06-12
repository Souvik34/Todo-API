import Navbar from '../components/Navbar';
import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-500 via-violet-700 to-blue-900 p-4">
      <Navbar />
      <TodoList />
    </div>
  );
}
