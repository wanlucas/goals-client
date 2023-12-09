import { Query } from '@/services/api/type';
import React from 'react';

interface SuccessResponse<Data> {
  success: boolean;
  data: Data;
}

interface ErrorResponse {
  success: boolean;
  data: undefined;
}

interface RequestProps<Data> {
  getData?: (queries: Query) => Promise<SuccessResponse<Data> | ErrorResponse>;
  onError?: () => void;
  listeners?: any[];
  defaultData?: any;
}

export default function useRequest<Data>({
  getData,
  onError,
  listeners = [],
  defaultData = [],
}: RequestProps<Data>) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<Data>(defaultData);
  const [queries, setQueries] = React.useState<Query>({});

  const setQuery = (key: string, value: string) => setQueries({ ...queries, [key]: value });

  const handleError = () => onError && onError();

  const request = async () => {
    setIsLoading(true);

    if (getData) {
      const response = await getData(queries);

      if (response.data) setData(response.data);
      else handleError();
    } else setData(defaultData);

    setIsLoading(false);
  };

  React.useEffect(() => {
    request();
  }, [...listeners, queries]);

  return {
    data,
    isLoading,
    setQuery,
  };
}
