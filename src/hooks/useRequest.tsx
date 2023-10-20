import React from 'react';

interface RequestProps {
  getData: () => Promise<any>;
}

export default function useRequest({ getData }: RequestProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState();

  const request = async () => {
    setIsLoading(true);
    const response = await getData();
    setData(response.data);
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
