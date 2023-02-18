
const BASE_URL = "http://127.0.0.1:5000/api";

const apiClient = {
  get: async (path) => {
    const response = await fetch(`${BASE_URL}${path}`);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  },

  post: async (path, body) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  },
};

export default apiClient;