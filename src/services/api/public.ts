import { post } from '@/utils/requests';

interface LoginOutput {
  token: string;
  id: string;
}

interface LoginInput {
  username: string;
  password: string;
}

const login = (payload: LoginInput) => post<LoginOutput>('public/sign-in', {
  body: payload,
  cache: 'no-cache',
});

export default {
  login,
};
