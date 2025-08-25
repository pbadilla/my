import React from "react";
import { useNavigate } from "react-router-dom";

import arrowLeft from "@images/left_arrow.svg";

import "@styles/backbutton.scss";

interface ButtonBackProps {
  page: string;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ page = 'home' }) => {
  const navigate = useNavigate(); 

  const handleBackClick = () => {
    page === 'wishlist' ? navigate('/') : navigate('/');
  };

  return (
    <a className="backbuttonWrapper" onClick={handleBackClick} title={`Go to ${page}`}>
      <img src={arrowLeft} alt="Go previous" />
      <span>Return</span>
    </a>
  );
};

export default ButtonBack;
