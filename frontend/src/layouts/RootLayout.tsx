import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { CustomCursor } from '../components/common/CustomCursor';
import { BackToTop } from '../components/common/BackToTop';
import { FloatingWhatsApp } from '../components/common/FloatingWhatsApp';

export const RootLayout: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-clinic-bg text-clinic-text relative">
      <CustomCursor />
      {!isAdmin && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <BackToTop />}
      {!isAdmin && <FloatingWhatsApp />}
    </div>
  );
};
