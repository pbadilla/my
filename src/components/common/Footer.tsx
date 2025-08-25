import React from "react";

import LogoMytheresa from "@components/icons/logo_mytheresa";

import "@styles/footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-text">
          <span>
            <LogoMytheresa />
          </span>
          <p>
            {`@2025 by `}
            <a href="https://github.com/pachibadilla">pachibadilla</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
