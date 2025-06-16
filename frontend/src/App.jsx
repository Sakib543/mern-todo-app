import { useState } from "react";
import axios, { Axios } from "axios";
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { IoClipboardOutline } from "react-icons/io5";
import { useEffect } from "react";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState("");

  //Add data to todo list
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post("/api/todos", {
        text: newTodo,
      });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log("TODO add nhii kr raha", error);
    }
  };
  //Get all todos list
  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.log("Get Fetch Not working", error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditingText(todo.text);
  };

  //update the todo list
  // Update the todo list
  const saveEdit = async (id) => {
    if (!editingText.trim()) return;
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        text: editingText,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingTodo(null);
      setEditingText("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Toggle completed status
  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.log(error);
    }
  };
  //Delete Todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from gray-50 to-blue-500 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <div>
          <h1 className="text-5xl font-bold text-blue-600 mb-8 text-center text-shadow-lg">
            Task Manager
          </h1>
          <hr className="mb-7 text-gray-300" />
          <form
            onSubmit={addTodo}
            className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg shadow-md"
          >
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="what needs to be done?"
              className="px-3 py-2 text-blue-500 outline-none placeholder-gray-400 flex-1"
              required
            />
            <button
              type="Submit"
              className="text-white bg-blue-600 hover:bg-green-700 duration-300 shadow-md px-4 py-2 rounded-md font-medium cursor-pointer"
            >
              Add Task
            </button>
          </form>
          <div className="mt-8">
            {todos.length === 0 ? (
              <div></div>
            ) : (
              <div>
                {todos.map((todo) => (
                  <div key={todo._id}>
                    {editingTodo === todo._id ? (
                      <div className="flex items-center gap-x-2">
                        <input
                          className="flex-1 p-3 border border-blue-100 rounded-lg outline-none ring-1 focus:ring-blue-300 text-blue-700 shaddow-md font-bold"
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(todo._id)}
                            className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-green-700 duration-300 shadow-md font-medium cursor-pointer"
                          >
                            <MdOutlineDone />
                          </button>
                          <button
                            onClick={() => {
                              setEditingTodo(null);
                              setEditingText("");
                            }}
                            className="px-2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 duration-300 shadow-md font-medium cursor-pointer"
                          >
                            <IoClose />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-4 overflow-hidden">
                          <button
                            onClick={() => toggleTodo(todo._id)}
                            className={`h-6 w-6 border rounded-full flex items-center justify-center ${
                              todo.completed
                                ? "bg-green-600 border-green-500"
                                : "border-gray-300 hover:border-blue-400"
                            }`}
                          >
                            {todo.completed && (
                              <MdOutlineDone className="text-white" />
                            )}
                          </button>
                          <span className="text-gray-700 font-bold truncate">
                            {todo.text}
                          </span>
                        </div>
                        <div className="flex gap-x-2 mt-2">
                          <button
                            onClick={() => startEditing(todo)}
                            className="px-2 py-2 bg-green-400 text-white rounded-md hover:bg-green-700 duration-300 shadow-md font-medium cursor-pointer"
                          >
                            <MdModeEditOutline />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo._id)}
                            className="px-2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 duration-300 shadow-md font-medium cursor-pointer"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
