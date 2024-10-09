import React, {createContext, useState} from 'react';

export const ToggleButtonContext = createContext<{
  selectedId: number;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
}>({
  selectedId: 0,
  setSelectedId: () => {},
});

export const ToggleButtonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedId, setSelectedId] = useState(0);

  return (
    <ToggleButtonContext.Provider value={{selectedId, setSelectedId}}>
      {children}
    </ToggleButtonContext.Provider>
  );
};
