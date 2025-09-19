import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'http://localhost:8000/api'; // Replace with your actual backend URL

export const login = (email, password) => {
  return axios.post(`${API_BASE_URL}/users/login`, {
    email: email,
    password: password,
  });
};

export const register = (body) => {
    return axios.post(`${API_BASE_URL}/users`, body);
};
