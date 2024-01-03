import React, { useState } from 'react';

type CustomSetData = (newData: React.SetStateAction<any>) => {
  undo: () => void;
};

export default function useCustomState<Data>(
  initialValue: Data,
): [Data, CustomSetData] {
  const [data, setData] = useState<Data>(initialValue);

  const customSetData: CustomSetData = (newData: Data) => {
    const previousData = structuredClone(data);
    setData(newData);

    return {
      undo: () => setData(previousData),
    };
  };

  return [data, customSetData];
}
