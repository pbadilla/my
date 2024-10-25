import React from "react";

import Logo from "@images/myTheresa_logo.png";

import "@styles/footer.scss";

const Footer: React.FC = () => {
  return (
    <footer>
      <a href="https://www.mytheresa.com" title="MyTheresa">
        <img src={Logo} className="logo" />
      </a>
    </footer>
  );
};

export default Footer;
