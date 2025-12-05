import axiosInstance from './axiosConfig'

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password })
      return response.data
    } catch (error) {
      throw error
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await axiosInstance.post('/auth/register', { name, email, password })
      return response.data
    } catch (error) {
      throw error
    }
  },
}
