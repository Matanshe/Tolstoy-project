import apiClient from "../utils/apiClient";

export const uploadImage = async (formData) => {
  try {
    const response = await apiClient.post("/images", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};