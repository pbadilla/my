import React, { ReactNode } from "react";

import { Header } from "@components/header/Header";
import Hero from "@components/common/Hero";
import Footer from "@components/common/Footer";

import "@styles/layout.scss";

interface LayoutProps {
  children: ReactNode;
  hasHeroSection?: boolean;
  hasCarrousels?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  hasHeroSection,
  hasCarrousels,
}) => {
  return (
    <div className="layout">
      <Header />

      <main className="layout-main">
        {/* Hero Section */}
        {hasHeroSection && <Hero />}

        {/* Carousels */}
        {hasCarrousels && <div className="movie-sections">{children}</div>}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
