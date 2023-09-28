import { post } from '@/utils/requests';

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginOutput {
  token: string;
  id: string;
}

const login = (payload: LoginPayload) => post<LoginOutput>('public/sign-in', {
  body: payload,
  cache: 'no-cache',
});

export default {
  login,
};
