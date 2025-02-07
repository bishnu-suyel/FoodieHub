import axios from 'axios';

// Replace with your Strapi backend URL
const API_URL = 'http://localhost:1337/api';

const api = axios.create({
  baseURL: API_URL,
});

export default api;
