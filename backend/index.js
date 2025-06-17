import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import todoRoutes from './routes/todo.route.js';
// import cors from 'cors';
import path from 'path';

dotenv.config();
const app = express();
app.use(express.json());    
// app.use(cors());

app.use('/api/todos', todoRoutes);
    

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'));
    })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
   console.log(`Server is running on port ${PORT}`);
})