import axios from "axios";

let baseURL = import.meta.env.VITE_REACT_API_URL;

const api = axios.create({
  baseURL,
  headers: {
      'Content-Type': 'application/json',
  }
});

export default api;