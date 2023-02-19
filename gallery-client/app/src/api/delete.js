import apiClient from "../utils/apiClient";

export const deleteImage = async (id) => {
  try {
    debugger;
    const response = await apiClient.delete("/delete", id);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};