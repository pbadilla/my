import React, { ReactNode } from "react";

import { Header } from "@components/header/Header";
import Hero from "@components/common/Hero";
import Footer from "@components/common/Footer";

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
        {/* Hero Section */}
        {hasHeroSection && <Hero />}

        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
