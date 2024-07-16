import axios from 'axios';

axios.defaults.baseURL = `${process.env.VUE_APP_BASE_URL}/`;
axios.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('token'); //to repeat every time"
