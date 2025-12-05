import apiClient from '../api/apiClient';

export const authService = {
  async login(email: string, password: string) {
    const res = await apiClient.post('/auth/login', { email, password });
    return res.data;
  },
  async register(name: string, email: string, password: string) {
    const res = await apiClient.post('/auth/register', { name, email, password });
    return res.data;
  },
  async getProfile(token: string) {
    const res = await apiClient.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.user;
  },
};
