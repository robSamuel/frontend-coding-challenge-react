import api from '../lib/axios';
import type { RemoteItem } from '../types/remote';

export const getElements = async (): Promise<RemoteItem[]> => {
  try {
    const response = await api.get<RemoteItem[]>('/elements');
    
    return response.data;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    if (error?.isAxiosError) {
      throw new Error(error.response?.data?.message || 'Error while fetching elements');
    }
    throw new Error('Unknown error while fetching elements');
  }
}
