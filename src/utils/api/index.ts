import axios from "axios";

const token_access = import.meta.env.VITE_API_TOKEN_ACCESS;
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

export { baseUrl, token_access, api };