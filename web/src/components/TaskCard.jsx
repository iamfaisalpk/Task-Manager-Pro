import Button from './Button'

const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  }

  const priorityColors = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600',
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[task.status]}`}>
          {task.status.replace('_', ' ')}
        </span>
      </div>

      <p className="text-gray-600 mb-3 text-sm">{task.description}</p>

      <div className="flex justify-between items-center mb-4">
        <span className={`text-sm font-medium ${priorityColors[task.priority]}`}>
          Priority: {task.priority}
        </span>
        {task.dueDate && (
          <span className="text-gray-500 text-sm">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(task._id)}>
          Delete
        </Button>
      </div>
    </div>
  )
}

export default TaskCard
