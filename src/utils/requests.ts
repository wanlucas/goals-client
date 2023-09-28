import { cookies } from 'next/headers';

const cookieStore = cookies();
const { API_URL = 'http://localhost:3001' } = process.env;

interface RequestOptions {
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: any;
}

interface RequestOutput<Data> {
  data: Data;
  status: number;
}

export const get = async <Data = any>(
  url: string,
  options: RequestOptions,
): Promise<RequestOutput<Data>> => fetch(`${API_URL}/${url}`, {
  ...options,
  method: 'GET',
}).then((res) => res.json());

interface PostOptions extends RequestOptions {
  body?: any;
}

export const post = async <Data = any>(
  url: string,
  options: PostOptions,
): Promise<RequestOutput<Data>> => fetch(`${API_URL}/${url}`, {
  ...options,
  method: 'POST',
  body: JSON.stringify(options.body),
  headers: {
    'Content-Type': 'application/json',
    authorization: cookieStore.get('token')?.value || '',
  },
}).then(async (res) => {
  const data = await res.json();

  return {
    data,
    status: res.status,
  };
});
