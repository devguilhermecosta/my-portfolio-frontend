import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

export { baseUrl, api, api_key };