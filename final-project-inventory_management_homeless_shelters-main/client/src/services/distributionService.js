import axios from "axios";

const API_URL = "http://localhost:8003/api/distributions";

// Fetch all distribution records
export const getDistributions = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a specific distribution by ID
export const getDistributionById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Add a new distribution record
export const createDistribution = async (distribution) => {
  const response = await axios.post(`${API_URL}`, distribution);
  return response.data;
};

// // Update an existing distribution record by ID
// export const updateInventoryQuantity = async (id, newQuantity) => {
//     const response = await axios.put(`${API_URL}/${id}`, { quantity: newQuantity });
//     return response.data;
//   };

// Delete a distribution record by ID
export const deleteDistribution = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};