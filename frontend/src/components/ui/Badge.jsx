import React from "react";

const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  // Define variant classes
  const variantClasses = {
    default: "bg-base-300 text-base-content",
    primary: "bg-primary text-primary-content",
    secondary: "bg-secondary text-secondary-content",
    accent: "bg-accent text-accent-content",
    neutral: "bg-neutral text-neutral-content",
    info: "bg-info text-info-content",
    success: "bg-success text-success-content",
    warning: "bg-warning text-warning-content",
    error: "bg-error text-error-content",
    outline: "bg-transparent border border-base-300 text-base-content",
    "outline-primary": "bg-transparent border border-primary text-primary",
    "outline-secondary":
      "bg-transparent border border-secondary text-secondary",
    "outline-accent": "bg-transparent border border-accent text-accent",
    ghost: "bg-base-200/50 text-base-content",
  };

  // Define size classes
  const sizeClasses = {
    xs: "text-xs py-0.5 px-1.5 h-5",
    sm: "text-xs py-0.5 px-2 h-6",
    md: "text-sm py-1 px-2.5 h-7",
    lg: "text-base py-1 px-3 h-8",
  };

  // Combine all classes
  const badgeClasses = `
    ${variantClasses[variant] || variantClasses.default}
    ${sizeClasses[size] || sizeClasses.md}
    inline-flex items-center justify-center rounded-full font-medium
    shadow-sm transition-all duration-200
    border border-transparent
    ${variant.startsWith("outline") ? "" : "hover:shadow-md"}
    ${className}
  `;

  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
};

export default Badge;
