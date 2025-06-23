# ✅ MERN To-Do App

A full-stack **To-Do List application** built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to add, edit, delete, and mark tasks as complete — all with a clean and modern frontend built using **React + Vite**.

## 📋 Features

- ✍️ Create and update tasks
- 🗑️ Delete tasks
- ✅ Mark tasks as complete/incomplete
- 📦 RESTful API with MongoDB database
- ⚡ Fast frontend with Vite
- 🔐 Environment-based configuration

## 🛠️ Tech Stack

**Frontend:**
- React.js (with Vite)
- Tailwind CSS (optional if used)

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- Nodemon (for dev)
- dotenv (for config management)

## 📂 Folder Structure

/client # React frontend
/server # Express backend

bash
Copy
Edit

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Sakib543/mern-todo-app.git
cd mern-todo-app
**## 2. Backend Setup**
bash
Copy
Edit
cd server
npm install
Create a .env file in /server with:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_connection_string
Run the backend server:

bash
Copy
Edit
npm run dev
**##  3. Frontend Setup**
bash
Copy
Edit
cd ../client
npm install
npm run dev
The frontend will typically run on http://localhost:5173 and the backend on http://localhost:5000.

📬 API Endpoints
Method	Endpoint	Description
GET	/api/todos	Get all to-do items
POST	/api/todos	Add a new to-do item
PUT	/api/todos/:id	Update a to-do item
DELETE	/api/todos/:id	Delete a to-do item


🚀 Live Demo
Coming soon (or insert link here if deployed)

👨‍💻 Author
Saqib Ahmed
GitHub: @Sakib543
