import React, { useState, createContext } from "react";

interface ILinearProgressBar {
  progress: number; 
}

interface IProgressBarContext {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export const ProgressBarContext = createContext<IProgressBarContext>({
  progress: 0,
  setProgress: () => {} // Placeholder function
});

export default function ProgressBarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [progress, setProgress] = useState(0);

  return (
    <ProgressBarContext.Provider
      value={{
        progress,
        setProgress,
      }}
    >
      {children}
    </ProgressBarContext.Provider>
  );
}
