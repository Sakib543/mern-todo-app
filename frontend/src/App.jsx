import { useState } from "react";
import axios from "axios";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post('http://localhost:5000/api/todos', {text: newTodo});
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.log("TODO add nhii kr raha", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from gray-50 to-blue-500 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <div>
          <h1 className="text-4xl font-bold text-gray-600 mb-8">
            Task Manager
          </h1>
          <form
            onSubmit={addTodo}
            className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg shadow-md"
          >
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="what needs to be done?"
              className="px-3 py-2 text-blue-500 outline-none placeholder-blue-400 flex-1"
              required
            />
            <button
              type="Submit"
              className="text-white bg-blue-600 hover:bg-green-700 duration-300 shadow-md px-4 py-2 rounded-md font-medium cursor-pointer"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
