import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ApiProvider } from "./contexts/Api.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/index.tsx";
import { TasksProvider } from "./contexts/Tasks/index.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider>
      <QueryClientProvider client={queryClient}>
        <TasksProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </TasksProvider>
      </QueryClientProvider>
    </ApiProvider>
  </StrictMode>
);
