import { useState } from "react";
import axios from "axios";
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
  const [editingText , setEditingText] = useState("")


  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post("http://localhost:5000/api/todos", {
        text: newTodo,
      });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log("TODO add nhii kr raha", error);
    }
  };
  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.log("Get Fetch Not working", error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const startEditing =(todo)=>{
    setEditingTodo(todo._id);
    setEditingText(todo.text);
  }
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
          <div>
            {todos.length === 0 ? (
              <div></div>
            ) : (
              <div>
                {todos.map((todo) => (
                  <div key={todo._id}>
                    {editingTodo === todo._id ? (
                      <div className="flex items-center gap-x-2">
                        <input className="p-3 border border-blue-200" type="text" value={editingText} onChange={(e)=> setEditingText(e.target.value)}/>
                       <div className="flex gap-2">
                         <button><MdOutlineDone/></button>
                        <button onClick={()=> setEditingTodo(null)}><IoClose/></button>
                       </div>
                      </div>
                    ):(
                      <div>
                        <div> 
                          {todo.text}
                          <button onClick={() => startEditing(todo)}><MdModeEditOutline/></button>
                          <button><FaTrash/>  </button>
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
