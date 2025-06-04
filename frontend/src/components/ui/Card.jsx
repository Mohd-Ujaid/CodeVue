import React from "react";

const Card = ({
  children,
  className = "",
  variant = "default",
  hover = false,
  ...props
}) => {
  // Define variant classes
  const variantClasses = {
    default: "bg-base-200 border border-base-300",
    primary: "bg-primary/10 border border-primary/20",
    secondary: "bg-secondary/10 border border-secondary/20",
    accent: "bg-accent/10 border border-accent/20",
    info: "bg-info/10 border border-info/20",
    success: "bg-success/10 border border-success/20",
    warning: "bg-warning/10 border border-warning/20",
    error: "bg-error/10 border border-error/20",
    outline: "bg-transparent border border-base-300",
    glass: "bg-base-100/50 backdrop-blur-sm border border-base-200/50",
  };

  // Define hover effect
  const hoverEffect = hover
    ? "transition-all duration-300 hover:shadow-lg hover:shadow-base-content/5 hover:-translate-y-1 hover:border-primary/30"
    : "";

  // Combine all classes
  const cardClasses = `
    ${variantClasses[variant] || variantClasses.default}
    rounded-lg overflow-hidden
    ${hoverEffect}
    ${className}
  `;

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

// Card subcomponents
Card.Header = ({children, className = "", ...props}) => (
  <div className={`p-5 border-b border-base-300 ${className}`} {...props}>
    {children}
  </div>
);

Card.Body = ({children, className = "", ...props}) => (
  <div className={`p-5 ${className}`} {...props}>
    {children}
  </div>
);

Card.Footer = ({children, className = "", ...props}) => (
  <div className={`p-5 border-t border-base-300 ${className}`} {...props}>
    {children}
  </div>
);

Card.Title = ({children, className = "", ...props}) => (
  <h3
    className={`text-lg font-semibold text-base-content ${className}`}
    {...props}
  >
    {children}
  </h3>
);

Card.Description = ({children, className = "", ...props}) => (
  <p className={`text-base-content/70 mt-2 ${className}`} {...props}>
    {children}
  </p>
);

export default Card;
