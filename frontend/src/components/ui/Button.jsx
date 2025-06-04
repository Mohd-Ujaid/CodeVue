import React from "react";
import {Loader2} from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className = "",
  icon,
  iconPosition = "left",
  ...props
}) => {
  // Define variant classes
  const variantClasses = {
    primary:
      "bg-primary hover:bg-primary-focus text-primary-content shadow-md hover:shadow-lg",
    secondary:
      "bg-secondary hover:bg-secondary-focus text-secondary-content shadow-md hover:shadow-lg",
    accent:
      "bg-accent hover:bg-accent-focus text-accent-content shadow-md hover:shadow-lg",
    neutral:
      "bg-neutral hover:bg-neutral-focus text-neutral-content shadow-md hover:shadow-lg",
    info: "bg-info hover:bg-info-focus text-info-content shadow-md hover:shadow-lg",
    success:
      "bg-success hover:bg-success-focus text-success-content shadow-md hover:shadow-lg",
    warning:
      "bg-warning hover:bg-warning-focus text-warning-content shadow-md hover:shadow-lg",
    error:
      "bg-error hover:bg-error-focus text-error-content shadow-md hover:shadow-lg",
    outline:
      "bg-transparent border border-base-300 hover:border-primary text-base-content hover:bg-base-200",
    ghost: "bg-transparent hover:bg-base-200 text-base-content",
    link: "bg-transparent text-primary hover:underline p-0 h-auto min-h-0 shadow-none",
    glass:
      "bg-base-200/50 backdrop-blur-sm border border-base-200/50 hover:bg-base-200/70 text-base-content",
  };

  // Define size classes
  const sizeClasses = {
    xs: "h-6 px-2 text-xs min-h-6",
    sm: "h-8 px-3 text-sm min-h-8",
    md: "h-10 px-4 min-h-10",
    lg: "h-12 px-6 text-lg min-h-12",
    xl: "h-16 px-8 text-xl min-h-16",
  };

  // Combine all classes
  const buttonClasses = `
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    rounded-md font-medium
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1
    flex items-center justify-center gap-2
    ${disabled || isLoading ? "opacity-70 cursor-not-allowed hover:shadow-none" : ""}
    ${className}
  `;

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && icon && iconPosition === "left" && icon}
      {children}
      {!isLoading && icon && iconPosition === "right" && icon}
    </button>
  );
};

export default Button;
