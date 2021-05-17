import axios from 'axios';
import constants from './config/constant';

const API_URL = constants.api.baseUrl;

const instance = axios.create({
  baseURL: API_URL, headers: {
    'Content-Type': 'application/json'
  }, withCredentials: true
});

export default instance;