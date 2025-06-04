import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import todoRoutes from './routes/todo.route.js';
import cors from 'cors';


dotenv.config();
const app = express();
app.use(express.json());    
app.use(cors());

app.use('/api/todos', todoRoutes);
    

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
   console.log(`Server is running on port ${PORT}`);
})