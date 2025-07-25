import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import LazyDataSection from "@/components/LazyDataSection";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-700 dark:text-gray-300">
      <Header />
      {children}
      <LazyDataSection minHeight="200px">
        <Footer />
      </LazyDataSection>
      <ScrollToTop />
    </div>
  );
};

export default Layout;
