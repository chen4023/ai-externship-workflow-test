import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ComponentShowcasePage } from "../pages/ComponentShowcase/ComponentShowcasePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ComponentShowcasePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
