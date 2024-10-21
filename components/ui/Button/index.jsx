import React from "react";

const Button = ({ children, onClick, variant = "default", className = "" }) => {
  return (
    <button
      className={`${variant}-btn custom-btn ${className} m-0`}
      onClick={onClick} 
      style={{ cursor: "pointer" }} 
    >
      {children}
    </button>
  );
};

export default Button;

