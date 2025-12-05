import taskService from '../services/taskService.js';
import { createTaskSchema, updateTaskSchema, querySchema } from '../validation/taskValidation.js';

class TaskController {
  async createTask(req, res, next) {
    try {
      const { error, value } = createTaskSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.details.map(d => d.message),
          timestamp: new Date().toISOString(),
        });
      }

      const task = await taskService.createTask(
        req.userId,
        value.title,
        value.description,
        value.status
      );

      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: task,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async getTasks(req, res, next) {
    try {
      const { error, value } = querySchema.validate(req.query);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.details.map(d => d.message),
          timestamp: new Date().toISOString(),
        });
      }

      const result = await taskService.getTasks(
        req.userId,
        value.search,
        value.status,
        value.page,
        value.limit
      );

      res.status(200).json({
        success: true,
        message: 'Tasks retrieved successfully',
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req, res, next) {
    try {
      const task = await taskService.getTaskById(req.params.id, req.userId);

      res.status(200).json({
        success: true,
        message: 'Task retrieved successfully',
        data: task,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const { error, value } = updateTaskSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.details.map(d => d.message),
          timestamp: new Date().toISOString(),
        });
      }

      const task = await taskService.updateTask(req.params.id, req.userId, value);

      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: task,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      await taskService.deleteTask(req.params.id, req.userId);

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
