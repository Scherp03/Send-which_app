import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}/api`,
});

export default api;
