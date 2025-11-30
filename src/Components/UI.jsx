import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export const Button = ({ children, variant, className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded';
  const styles =
    variant === 'outline'
      ? `${base} border border-gray-300 bg-transparent text-gray-700 ${className}`
      : `${base} bg-indigo-600 text-white ${className}`;

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};

export default { Card, CardContent, Button };
