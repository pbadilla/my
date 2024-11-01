import React from 'react';

interface DeleteProps {
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void; 
}

const Delete: React.FC<DeleteProps> = ({ onClick }) => {
  return (
    <svg 
      width="16" 
      height="21" 
      viewBox="0 0 16 21" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      onClick={onClick} // Ensure you handle the click
    >
      <path 
        d="M2.89999 4.755V19.085C2.89999 19.365 3.11999 19.585 3.39999 19.585H13.4C13.68 19.585 13.9 19.365 13.9 19.085V4.755" 
        stroke="#222222" 
        strokeMiterlimit={10}  
        strokeLinecap="round"  
        strokeLinejoin="round"  
      />
      <path 
        d="M10.4 2.755H6.39999V1.255C6.39999 0.975005 6.61999 0.755005 6.89999 0.755005H9.89999C10.18 0.755005 10.4 0.975005 10.4 1.255V2.755Z" 
        stroke="#222222" 
        strokeMiterlimit={10}  
        strokeLinecap="round"  
        strokeLinejoin="round"  
      />
      <path 
        d="M1.39999 2.755H15.4" 
        stroke="#222222" 
        strokeMiterlimit={10}  
        strokeLinecap="round"  
        strokeLinejoin="round"  
      />
      <path 
        d="M8.39999 8.13501V15.595" 
        stroke="#222222" 
        strokeMiterlimit={10}  
        strokeLinecap="round"  
        strokeLinejoin="round"  
      />
      <path 
        d="M11.4 7.13501V16.595" 
        stroke="#222222" 
        strokeMiterlimit={10}  
        strokeLinecap="round"  
        strokeLinejoin="round"  
      />
      <path 
        d="M5.39999 7.13501V16.595" 
        stroke="#222222" 
        strokeMiterlimit={10}  
        strokeLinecap="round"  
        strokeLinejoin="round"  
      />
    </svg>
  );
};

export default Delete;
