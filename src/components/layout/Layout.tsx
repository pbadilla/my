import React, { ReactNode } from "react";

import Footer from "@components/common/Footer";
import Hero from "@components/common/Hero";
import { Header } from "@components/common/Header";

import "@styles/layout.scss";

interface LayoutProps {
  children: ReactNode;
  hasHeroSection?: boolean;
  hasBackButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  hasHeroSection,
  hasBackButton,
}) => {
  return (
    <div className="layout">
      <Header hasBackButton={hasBackButton} />

      <main className="layout-main">
        {}
        {hasHeroSection && <Hero />}

        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
