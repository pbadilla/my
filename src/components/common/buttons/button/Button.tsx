import React from 'react';

import '@styles/button.scss';

type ButtonProps = {
  text: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ text, icon, onClick, className }) => {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{text}</span>
    </button>
  );
};

export default Button;
