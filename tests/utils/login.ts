import { AxiosResponse } from 'axios';
import { api } from './api';
import { token } from './constants';

interface MobiusLoginResponse extends AxiosResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export async function login() {
  const response: MobiusLoginResponse = await api.post('/login', {
    phone: '+5511968427903',
    code: '1234',
  });
  token.accessToken = response.data.accessToken;
  token.refreshToken = response.data.refreshToken;
}
