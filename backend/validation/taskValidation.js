import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().trim().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title cannot exceed 100 characters',
  }),
  description: Joi.string().max(500).trim().allow('').messages({
    'string.max': 'Description cannot exceed 500 characters',
  }),
  status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending').messages({
    'any.only': 'Status must be pending, in-progress, or completed',
  }),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).trim(),
  description: Joi.string().max(500).trim().allow(''),
  status: Joi.string().valid('pending', 'in-progress', 'completed').messages({
    'any.only': 'Status must be pending, in-progress, or completed',
  }),
}).min(1).messages({
  'object.min': 'At least one field must be updated',
});

export const querySchema = Joi.object({
  search: Joi.string().trim().allow(''),
  status: Joi.string().valid('pending', 'in-progress', 'completed'),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});
