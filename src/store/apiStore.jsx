import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

export const ApiProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
