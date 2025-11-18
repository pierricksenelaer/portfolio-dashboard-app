import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Must match the cookie name used in src/middleware.ts
const AUTH_COOKIE_NAME = 'portfolio_auth'; 

const MOCK_USERNAME = 'vega';
const MOCK_PASSWORD = 'portfolio123';

// Note: In a production app, I'd use a library like js-cookie for better cross-browser compatibility.

// Checks if the 'portfolio_auth=true' cookie exists
const getAuthStatusFromCookie = () => {
    if (typeof document === 'undefined') return false;
    return document.cookie.includes(`${AUTH_COOKIE_NAME}=true`);
};

// Sets the authentication cookie
const setAuthCookie = () => {
    if (typeof document !== 'undefined') {
        document.cookie = `${AUTH_COOKIE_NAME}=true; max-age=${7 * 24 * 60 * 60}; path=/; SameSite=Lax`;
    }
};

// Clears the authentication cookie
const clearAuthCookie = () => {
    if (typeof document !== 'undefined') {
        // Sets the expiration date to the past
        document.cookie = `${AUTH_COOKIE_NAME}=; max-age=0; path=/; SameSite=Lax`;
    }
};

export const useAuth = () => {
  const router = useRouter();
  
  // Initialize state by checking the cookie on the client side
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(getAuthStatusFromCookie);
  const [isReady, setIsReady] = useState(false); 

  useEffect(() => {
    // Re-check cookie status after mount for reliability
    setIsAuthenticated(getAuthStatusFromCookie());
    setIsReady(true);
  }, []);

  const login = useCallback((username: string, password: string): boolean => {
    if (username === MOCK_USERNAME && password === MOCK_PASSWORD) {
      setAuthCookie(); // Set the cookie
      setIsAuthenticated(true);
      router.push('/dashboard'); // Redirect to dashboard on success
      return true;
    }
    return false;
  }, [router]);

  const logout = useCallback(() => {
    clearAuthCookie(); // Clear the cookie
    setIsAuthenticated(false);
    router.refresh(); 
    router.push('/login'); 
  }, [router]);

  return { 
    isAuthenticated, 
    isReady, 
    login, 
    logout 
  };
};