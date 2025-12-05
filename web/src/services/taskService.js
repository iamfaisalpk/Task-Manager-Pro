import axiosInstance from './axiosConfig'

export const taskService = {
  getTasks: async (page = 1, limit = 10, search = '', status = 'all') => {
    try {
      const params = { page, limit }
      if (search) params.search = search
      if (status !== 'all') params.status = status
      const response = await axiosInstance.get('/tasks', { params })
      return response.data
    } catch (error) {
      console.error('getTasks error:', error.message)
      throw error
    }
  },

  getTaskById: async (id) => {
    try {
      const response = await axiosInstance.get(`/tasks/${id}`)
      return response.data
    } catch (error) {
      console.error('getTaskById error:', error.message)
      throw error
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await axiosInstance.post('/tasks', taskData)
      return response.data
    } catch (error) {
      console.error('createTask error:', error.message)
      throw error
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const response = await axiosInstance.put(`/tasks/${id}`, taskData)
      return response.data
    } catch (error) {
      console.error('updateTask error:', error.message)
      throw error
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await axiosInstance.delete(`/tasks/${id}`)
      return response.data
    } catch (error) {
      console.error('deleteTask error:', error.message)
      throw error
    }
  },
}
