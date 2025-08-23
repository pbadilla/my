import React from "react";
import "@styles/button.scss";

type ButtonProps = {
  children?: React.ReactNode;
  text?: string;
  id?: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: "default" | "ghost" | "action" | "drama" | "comedy" | "wishlist";
  size?: "sm" | "md" | "lg" | "xl" | "icon";
};

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  className = "",
  id,
  variant = "default",
  size = "md",
}) => {
  const buttonClass = `button button--${variant} button--${size} ${className}`;

  return (
    <button type="button" id={id} className={buttonClass} onClick={onClick}>
      {icon && <span className="button-icon">{icon}</span>}
      {text && <span className="button-text">{text}</span>}
    </button>
  );
};

export default Button;
