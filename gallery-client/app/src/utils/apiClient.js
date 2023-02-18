import axios from 'axios';

const BASE_URL = "http://127.0.0.1:5000/api";

const apiClient = {
  get: async (path) => {
    try {
      const response = await axios.get(`${BASE_URL}${path}`);
      return response.data;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  },

  post: async (path, body) => {
    try {
      const response = await axios.post(`${BASE_URL}${path}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  },
};

export default apiClient;