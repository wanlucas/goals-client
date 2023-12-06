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
  getData?: () => Promise<SuccessResponse<Data> | ErrorResponse>;
  onError?: () => void;
  defaultData?: any;
}

export default function useRequest<Data>({
  getData,
  onError,
  defaultData = [],
}: RequestProps<Data>) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<Data>(defaultData);

  const handleError = () => onError && onError();

  const request = async () => {
    setIsLoading(true);

    if (getData) {
      const response = await getData();

      if (response.data) setData(response.data);
      else handleError();
    } else setData(defaultData);

    setIsLoading(false);
  };

  React.useEffect(() => {
    request();
  }, []);

  return {
    isLoading,
    data,
  };
}
