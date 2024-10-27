import React from 'react';

import '@styles/button.scss';
import test from 'node:test';

type ButtonProps = {
  text: string;
  id?: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ text, icon, onClick, className, id }) => {
  return (
    <button onClick={onClick} className={`button ${className}`} id={id}>
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{text}</span>
    </button>
  );
};

export default Button;
