import axios from "axios";

const API_URL = "http://localhost:8003/api/shelters";

export const getShelters = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getShelterById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const addShelter = async (shelter) => {
    const response = await axios.post(API_URL, shelter);
    return response.data;
};

export const updateShelter = async (id, shelter) => {
    const response = await axios.put(`${API_URL}/${id}`, shelter);
    return response.data;
};

export const deleteShelter = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
