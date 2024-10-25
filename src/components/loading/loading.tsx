import React from "react";

import "./loading.scss";

const Loading: React.FC = () => {
  return (
    <div className="loader">
      <span className="loader-inner-1"></span>
      <span className="loader-inner-2"></span>
      <span className="loader-inner-3"></span>
    </div>
  );
};

export default Loading;
