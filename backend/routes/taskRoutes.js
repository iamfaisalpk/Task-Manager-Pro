import express from 'express'
import { verifyToken } from '../utils/generateToken.js'

const router = express.Router()

// Mock tasks (replace with DB)
let tasks = []

// Middleware to verify token
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }
    const decoded = verifyToken(token)
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

// GET tasks with pagination, search, filter
router.get('/', auth, (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = 'all' } = req.query
    let filtered = tasks.filter(t => t.userId === req.userId)

    if (search) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status !== 'all') {
      filtered = filtered.filter(t => t.status === status)
    }

    const total = filtered.length
    const start = (page - 1) * limit
    const paginatedTasks = filtered.slice(start, start + parseInt(limit))

    res.json({
      tasks: paginatedTasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET single task
router.get('/:id', auth, (req, res) => {
  try {
    const task = tasks.find(t => t._id === req.params.id && t.userId === req.userId)
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// CREATE task
router.post('/', auth, (req, res) => {
  try {
    const { title, description, priority, status } = req.body

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' })
    }

    const newTask = {
      _id: Date.now().toString(),
      userId: req.userId,
      title,
      description,
      priority: priority || 'medium',
      status: status || 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    tasks.push(newTask)
    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// UPDATE task
router.put('/:id', auth, (req, res) => {
  try {
    const taskIndex = tasks.findIndex(t => t._id === req.params.id && t.userId === req.userId)
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' })
    }

    const { title, description, priority, status } = req.body
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: title || tasks[taskIndex].title,
      description: description || tasks[taskIndex].description,
      priority: priority || tasks[taskIndex].priority,
      status: status || tasks[taskIndex].status,
      updatedAt: new Date()
    }

    res.json(tasks[taskIndex])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// DELETE task
router.delete('/:id', auth, (req, res) => {
  try {
    const taskIndex = tasks.findIndex(t => t._id === req.params.id && t.userId === req.userId)
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' })
    }

    const deletedTask = tasks.splice(taskIndex, 1)
    res.json({ message: 'Task deleted', task: deletedTask[0] })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
