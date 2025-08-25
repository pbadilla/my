import { ReactNode } from "react";
import { render, RenderResult } from "@testing-library/react";
import { ThemeProvider } from "../../src/context/ThemeContext";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface RenderOptions {
  initialEntries?: MemoryRouterProps['initialEntries'];
}

export function renderWithProviders(ui: ReactNode, options?: RenderOptions): RenderResult {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  }); // create a fresh client for each test

  return render(
    <MemoryRouter initialEntries={options?.initialEntries}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>{ui}</ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
}
