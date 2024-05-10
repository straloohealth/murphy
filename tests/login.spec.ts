import { AxiosError, AxiosResponse } from 'axios';
import { api } from './utils/api';
import { token } from './utils/constants';

interface MobiusLoginResponse extends AxiosResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

describe('when in login', () => {
  it('should receive authentication token', async () => {
    const response: MobiusLoginResponse = await api.post('/login', {
      phone: '+5511968427903',
      code: '1234',
    });
    token.accessToken = response.data.accessToken;
    token.refreshToken = response.data.refreshToken;

    expect(token.accessToken).toEqual(response.data.accessToken);
    expect(token.refreshToken).toEqual(response.data.refreshToken);
  });

  it('should receive incorrect phone or code error', async () => {
    await api
      .post('/login', {
        phone: '+5511968427905',
        code: '1235',
      })
      .catch((err: AxiosError) => {
        expect(err.response?.status).toBe(401);
        expect(err.response?.statusText).toBe('Unauthorized');
      });
  });
});
