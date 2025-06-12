import Navbar from '../components/Navbar';
import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-950 via-purple-950 to-black p-4">
      <Navbar />
      <TodoList />
    </div>
  );
}
