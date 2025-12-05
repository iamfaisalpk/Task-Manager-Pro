import apiClient from '../api/apiClient';

export const taskService = {
  async getTasks(params: { page: number; limit: number; search?: string; status?: string; priority?: string }) {
    const res = await apiClient.get('/tasks', { params });
    return res.data;
  },
  async getTask(id: string) {
    const res = await apiClient.get(`/tasks/${id}`);
    return res.data;
  },
  async createTask(payload: any) {
    const res = await apiClient.post('/tasks', payload);
    return res.data;
  },
  async updateTask(id: string, payload: any) {
    const res = await apiClient.put(`/tasks/${id}`, payload);
    return res.data;
  },
  async deleteTask(id: string) {
    await apiClient.delete(`/tasks/${id}`);
    return;
  },
};
