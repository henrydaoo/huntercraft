import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-700 dark:text-gray-300">
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
