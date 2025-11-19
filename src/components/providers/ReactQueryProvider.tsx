'use client';

import { useState } from 'react';
import { 
  QueryClient, 
  QueryClientProvider 
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  // Use state to ensure the QueryClient is only created once per component lifecycle
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Global default: set staleTime to 5 minutes (5 * 60 * 1000)
        // This prevents immediate refetching if data is considered "fresh"
        staleTime: 1000 * 60 * 5,
        // Disable retries in development, since MSW should work immediately. (404 console.logds removal)
        retry: process.env.NODE_ENV === 'development' ? 0 : 3,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only show Devtools in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}