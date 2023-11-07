import { cookies } from 'next/headers';

const { API_URL = 'http://localhost:3001' } = process.env;

interface RequestOptions {
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: any;
}

interface Options extends RequestOptions {
  body?: any;
}

interface GetOutput<Data> {
  data: Data;
  status: number;
}

interface PostOutput<Data = null> {
  status: number;
  data: Data;
}

interface DeleteOutput {
  status: number;
}

const request = async (
  method: string,
  url: string,
  options: Options = {},
) => {
  const cookieStore = cookies();
  const body = options.body ? JSON.stringify(options.body) : undefined;

  return fetch(`${API_URL}/${url}`, {
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
): Promise<GetOutput<Data>> => request('GET', url, options || {});

const post = async <Data>(
  url: string,
  options: Options = {},
): Promise<PostOutput<Data>> => request('POST', url, options);

const put = async <Data>(
  url: string,
  options: Options = {},
): Promise<PostOutput<Data>> => request('PUT', url, options);

const remove = async (url: string): Promise<DeleteOutput> => request('DELETE', url);

export default {
  get,
  post,
  put,
  remove,
};
