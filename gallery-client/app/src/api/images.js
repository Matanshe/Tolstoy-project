import apiClient from '../utils/apiClient';

export const getAllImages = async () => {
    try {
      const response = await apiClient.get('/images');
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };
  
