import { Query } from '@/services/api/type';
import { cookies } from 'next/headers';

const { API_URL = 'http://localhost:3001' } = process.env;

interface RequestOptions {
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: any;
  query?: Query;
}

interface Options extends RequestOptions {
  body?: any;
}

interface RequestOutput<Data = null> {
  status: number;
  data: Data;
}

const request = async (
  method: string,
  url: string,
  { query: q, ...options }: Options = {},
) => {
  const cookieStore = cookies();
  const body = options.body ? JSON.stringify(options.body) : undefined;
  const query = new URLSearchParams(q || {});

  console.log(`${API_URL}/${url}${query}`);
  return fetch(`${API_URL}/${url}${query}`, {
    ...options,
    method,
    body,
    headers: {
      authorization: cookieStore.get('token')?.value || '',
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response;
    })
    .then(async (response) => {
      try {
        return {
          data: await response.json(),
          status: response.status,
        };
      } catch {
        return {
          status: response.status,
          data: null,
        };
      }
    });
};

const get = async <Data>(
  url: string,
  options?: RequestOptions,
): Promise<RequestOutput<Data>> => request('GET', url, options || {});

const post = async <Data>(
  url: string,
  options: Options = {},
): Promise<RequestOutput<Data>> => request('POST', url, options);

const put = async <Data>(
  url: string,
  options: Options = {},
): Promise<RequestOutput<Data>> => request('PUT', url, options);

const remove = async <Data>(
  url: string,
  options: Options = {},
): Promise<RequestOutput<Data>> => request('DELETE', url, options);

export default {
  get,
  post,
  put,
  remove,
};
