// src/components/common/Button.tsx
import React from 'react';

// Define the available variants for the button
type ButtonVariant = 'primary' | 'outline' | 'destructive';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 dark:bg-blue-700 dark:hover:bg-blue-600 px-4 py-2 text-sm',
  outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700 px-4 py-2 text-sm',
  destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-500/50 dark:bg-red-700 dark:hover:bg-red-600 px-4 py-2 text-sm',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  ...props
}) => {
  const finalClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button
      className={finalClasses}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        // TW Loading spinner
        <svg 
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
};