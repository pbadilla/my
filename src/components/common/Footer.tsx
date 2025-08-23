import React from "react";

import Logo from "@images/footer_logo.png";

import "@styles/footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-text">
          <span>{Logo}</span>
          <p>
            @ copyright 2024 myTheresa developed by{" "}
            <a href="https://github.com/pachibadilla">pachibadilla</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
