import { useContext } from "react";
import { LoadingContext } from "@/contexts/LoadingContext";

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
