import express from 'express';
import Todo from '../models/todoModel.js';

const router = express.Router();

// get all todo
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Create a todo
router.post('/', async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    })
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Update a todo/ completed
router.patch('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo) { res.status(200).json({ message: "Todo Not found" }) }

        if (req.body.text !== undefined) {
            todo.text = req.body.text;
        }
        if (req.body.isCompleted !== undefined) {
            todo.isCompleted = req.body.isCompleted;
        }
        const updateTodo = await todo.save();
        res.status(200).json(updateTodo);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// delete a todo
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Todo deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export default router;