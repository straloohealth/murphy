import axios from 'axios';
import { baseURL } from './constants';

const api = axios.create({
  baseURL,
  headers: {
    'Retry-After': 3600,
    'Content-Type': 'application/json',
    origin: 'https://mobius.api.straloo.com.br',
  },
});

export { api };
