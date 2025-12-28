import { createContext, useState, ReactNode, CSSProperties } from "react";
import { HashLoader } from "react-spinners";

type LoadingContextType = {
  isLoading: boolean;
  active?: (data: boolean) => void;
};

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const active = (data: boolean) => setIsLoading(data);

  return (
    <LoadingContext.Provider value={{ isLoading, active }}>
      {isLoading && (
        <div className="fixed w-full h-full bg-white/60 top-0 left-0 z-[99999] flex items-center justify-center">
        
          <HashLoader
            color="#2196f3"
            loading={isLoading}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {children}
    </LoadingContext.Provider>
  );
};
