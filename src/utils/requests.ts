import { cookies } from 'next/headers';

const { API_URL = 'http://localhost:3001' } = process.env;

interface RequestOptions {
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: any;
}

interface GetOutput<Data> {
  data: Data;
  status: number;
}

interface PostOutput {
  status: number;
}

export const get = async <Data = any>(
  url: string,
  options: RequestOptions | undefined = {},
): Promise<GetOutput<Data>> => {
  const cookieStore = cookies();

  return fetch(`${API_URL}/${url}`, {
    ...options,
    method: 'GET',
    headers: {
      authorization: cookieStore.get('token')?.value || '',
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return {
      data,
      status: response.status,
    };
  });
};

interface PostOptions extends RequestOptions {
  body?: any;
}

export const post = async (
  url: string,
  options: PostOptions,
): Promise<PostOutput> => {
  const cookieStore = cookies();

  return fetch(`${API_URL}/${url}`, {
    ...options,
    method: 'POST',
    body: JSON.stringify(options.body),
    headers: {
      authorization: cookieStore.get('token')?.value || '',
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    return {
      status: response.status,
    };
  });
};
