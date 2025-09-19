import axios from "axios";

const API_URL = "http://localhost:8003/api/inventory";

// Fetch all inventory items
export const getInventoryItems = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

// Fetch items by shelter ID
export const getItemsByShelter = async (shelterId) => {
  const response = await axios.get(`${API_URL}/shelter/${shelterId}`);
  return response.data;
};

// Fetch a specific inventory item by ID
export const getInventoryById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Add a new inventory item
export const addInventoryItem = async (item) => {
  const response = await axios.post(`${API_URL}/add`, item);
  return response.data;
};

// Update an existing inventory item by ID
export const updateInventoryItem = async (id, item) => {
  const response = await axios.put(`${API_URL}/${id}`, item);
  return response.data;
};

// Delete an inventory item by ID
export const deleteInventoryItem = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
