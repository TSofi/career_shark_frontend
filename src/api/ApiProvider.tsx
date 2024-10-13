import { createContext, useContext } from "react";
import { Client } from "./client";

const ApiContext = createContext<Client | null>(null);

interface ApiProviderProps {
  children: React.ReactNode;
  client?: Client;
}

export default function ApiProvider({ children, client }: ApiProviderProps) {
  const apiClient = client || new Client();

  return (
    <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
}