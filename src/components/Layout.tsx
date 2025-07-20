import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import LazyDataSection from "@/components/LazyDataSection";
import { Toaster } from "sonner";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-700 dark:text-gray-300">
      <Header />
      {children}
      <LazyDataSection>
        <Footer />
      </LazyDataSection>
      <ScrollToTop />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Layout;
