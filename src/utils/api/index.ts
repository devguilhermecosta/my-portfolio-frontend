import axios from "axios";

const baseUrl = 'https://api.myportfolio.devguilhermecosta.com';

const api = axios.create({
  baseURL: baseUrl,
});

export { baseUrl, api };