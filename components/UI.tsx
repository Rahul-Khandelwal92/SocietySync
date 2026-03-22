import React from 'react';

export const Card: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className} ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}>
    {children}
  </div>
);

export const Button: React.FC<{ 
  children: React.ReactNode, 
  onClick?: () => void, 
  variant?: 'primary' | 'secondary' | 'danger' | 'outline',
  className?: string,
  disabled?: boolean,
  type?: "button" | "submit" | "reset"
}> = ({ children, onClick, variant = 'primary', className = '', disabled, type = "button" }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-primary text-white hover:bg-[#002855]",
    secondary: "bg-secondary text-gray-900 hover:bg-amber-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  };

  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode, color?: string, className?: string }> = ({ children, color = 'bg-gray-100 text-gray-800', className = '' }) => (
  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${color} ${className}`}>
    {children}
  </span>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    {...props} 
    className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${props.className}`} 
  />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select 
    {...props} 
    className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${props.className}`} 
  >
    {props.children}
  </select>
);