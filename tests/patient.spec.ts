import { AxiosResponse } from 'axios';
import { api } from './utils/api';
import { token } from './utils/constants';

interface PatientResponse extends AxiosResponse {
  data: {
    data: {
      me: {
        cpf: string;
        id: string;
        meta: {
          [key: string]: string;
        };
        name: string;
        origin: string;
        phone: string;
      };
    };
  };
}

interface MobiusLoginResponse extends AxiosResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

let data = JSON.stringify({
  query: '{  me {    cpf    id    name    origin    phone  }}',
});

describe('when get patient data', () => {
  beforeAll(async () => {
    const response: MobiusLoginResponse = await api.post('/login', {
      phone: '+5511968427903',
      code: '1234',
    });
    token.accessToken = response.data.accessToken;
    token.refreshToken = response.data.refreshToken;
  });
  it('should receive patient data', async () => {
    const {
      data: {
        data: { me },
      },
    }: PatientResponse = await api.post('/graphql', data, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });
    expect(me.cpf).toEqual('46546717220');
    expect(me.name).toEqual('John Doe');
  });
});
