import Task from '../models/Task.js';
import ApiError from '../utils/ApiError.js';

class TaskService {
  async createTask(userId, title, description, status) {
    const task = new Task({
      title,
      description,
      status,
      user: userId,
    });

    await task.save();
    return task;
  }

  async getTasks(userId, search, status, page, limit) {
    const query = { user: userId };

    if (search) {
      query.$text = { $search: search };
    }

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      Task.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Task.countDocuments(query),
    ]);

    return {
      tasks,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getTaskById(taskId, userId) {
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      throw new ApiError(404, 'Task not found');
    }
    return task;
  }

  async updateTask(taskId, userId, updateData) {
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      throw new ApiError(404, 'Task not found');
    }

    Object.assign(task, updateData);
    await task.save();
    return task;
  }

  async deleteTask(taskId, userId) {
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) {
      throw new ApiError(404, 'Task not found');
    }
    return task;
  }
}

export default new TaskService();
