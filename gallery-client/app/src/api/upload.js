import apiClient from "../utils/apiClient";

export const uploadImage = async (formData) => {
  try {
    debugger;
    const response = await apiClient.post("/upload", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};