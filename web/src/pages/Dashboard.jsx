import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTasks } from '../hooks/useTasks'
import { logout } from '../redux/slices/authSlice'
import { fetchTasks, createTask, updateTask, deleteTask, setSearch, setFilter, setPage } from '../redux/slices/taskSlice'
import Button from '../components/Button'
import Modal from '../components/Modal'
import TaskCard from '../components/TaskCard'
import Pagination from '../components/Pagination'
import Skeleton from '../components/Skeleton'
import Toast from '../components/Toast'
import { validateTaskForm } from '../utils/validation'
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../utils/constants'

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { tasks, loading, error, pagination, search, filter } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'medium', status: 'pending' })
  const [formErrors, setFormErrors] = useState({})
  const [toast, setToast] = useState(null)
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    if (!user) return
    dispatch(fetchTasks({ page: pagination.page, limit: pagination.limit, search, status: filter }))
  }, [dispatch, pagination.page, search, filter, user])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const openCreateModal = () => {
    setEditingTask(null)
    setFormData({ title: '', description: '', priority: 'medium', status: 'pending' })
    setFormErrors({})
    setIsModalOpen(true)
  }

  const openEditModal = (task) => {
    setEditingTask(task)
    setFormData({ title: task.title, description: task.description, priority: task.priority, status: task.status })
    setFormErrors({})
    setIsModalOpen(true)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleModalSubmit = async () => {
    const { isValid, errors } = validateTaskForm(formData)
    if (!isValid) {
      setFormErrors(errors)
      return
    }

    try {
      if (editingTask) {
        await dispatch(updateTask({ id: editingTask._id, taskData: formData })).unwrap()
        setToast({ message: 'Task updated successfully!', type: 'success' })
      } else {
        await dispatch(createTask(formData)).unwrap()
        setToast({ message: 'Task created successfully!', type: 'success' })
      }
      setIsModalOpen(false)
    } catch (err) {
      setToast({ message: err || 'Operation failed', type: 'error' })
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await dispatch(deleteTask(taskId)).unwrap()
        setToast({ message: 'Task deleted successfully!', type: 'success' })
      } catch (err) {
        setToast({ message: err || 'Failed to delete task', type: 'error' })
      }
    }
  }

  const handleSearch = () => {
    dispatch(setSearch(searchInput))
  }

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value))
  }

  const totalPages = Math.ceil(pagination.total / pagination.limit) || 1

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Loading user info...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Task Manager Pro</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user?.name}</span>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Tasks</h2>
          <Button variant="primary" onClick={openCreateModal}>
            + New Task
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search tasks..."
                />
                <Button variant="secondary" onClick={handleSearch}>
                  Search
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
              <select
                value={filter}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <p className="text-sm text-gray-600">
                Total: <span className="font-bold">{pagination.total}</span> tasks
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-semibold">Error loading tasks</p>
            <p className="text-sm">{error}</p>
            <p className="text-sm mt-2">Make sure the backend is running at {import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}</p>
          </div>
        )}

        {loading ? (
          <Skeleton count={5} />
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 text-lg">No tasks found. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={openEditModal}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}

        <Pagination currentPage={pagination.page} totalPages={totalPages} onPageChange={(page) => dispatch(setPage(page))} />
      </main>

      <Modal
        isOpen={isModalOpen}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task title"
            />
            {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task description"
              rows="3"
            />
            {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PRIORITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STATUS_OPTIONS.slice(1).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default Dashboard
