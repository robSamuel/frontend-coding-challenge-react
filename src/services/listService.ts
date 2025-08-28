import api from '../lib/axios';
import type { RemoteItem } from '../types/remote';

const API_BASE_URL = 'https://6172cfe5110a740017222e2b.mockapi.io';

export const listService = {
  async getElements(): Promise<RemoteItem[]> {
    try {
      const response = await api.get<RemoteItem[]>(`${API_BASE_URL}/elements`);
      return response.data;
    } catch (error) {
      if (api.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error al cargar los elementos');
      }
      throw new Error('Error desconocido al cargar los elementos');
    }
  },
};
