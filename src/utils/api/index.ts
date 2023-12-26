import axios from "axios";

const baseUrl = 'https://api.my-portfolio.devguilhermecosta.com';

const api = axios.create({
  baseURL: baseUrl,
});

export { baseUrl, api };