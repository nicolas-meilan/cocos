import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://dummy-api-topaz.vercel.app';

const Api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Api;