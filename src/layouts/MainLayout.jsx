// src/layouts/MainLayout.jsx
import React, { Suspense, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "/src/components/Navbar.jsx";
import Footer from "/src/components/Footer.jsx";
import Modal from "/src/components/Modal.jsx";
import useModalStore from "/src/store/modalStore.js";
import AdminSidebar from "/src/components/admin/AdminSidebar.jsx";

// ✅ Pakai path sesuai struktur kamu (tidak ada folder /auth)
import LoginPage from "/src/pages/LoginPage.jsx";
import RegisterPage from "/src/pages/RegisterPage.jsx";
import ForgotPasswordPage from "/src/pages/ForgotPasswordPage.jsx";

import HomeBackground from "/src/components/backgrounds/HomeBackground.jsx";

const MainLayout = () => {
  const { isModalOpen, modalView, closeModal } = useModalStore();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isPanelPage =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/instructor");

  const isHomePage = location.pathname === "/";
  
  // ✅ Tambah pengecualian untuk learning page dan student dashboard
  const isLearningPage = location.pathname.includes("/learn/");
  const isStudentDashboard = location.pathname === "/student-dashboard";

  const pageLoadingFallback = (
    <div className="flex justify-center items-center h-full p-10">
      <motion.div
        className="flex items-center space-x-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
        <p className="bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent font-medium">
          Memuat...
        </p>
      </motion.div>
    </div>
  );

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div
      className={`flex flex-col min-h-screen relative overflow-hidden ${
        isHomePage
          ? "bg-gradient-to-br from-slate-50 to-purple-50/30"
          : "bg-white"
      }`}
    >
      {/* background buat di home */}
      {isHomePage && <HomeBackground />}

      {/* Navbar */}
      <div className="relative z-30">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Konten Utama */}
      <main className="flex-grow relative z-20">
        {isPanelPage ? (
          <div className="container mx-auto flex flex-col md:flex-row gap-4 py-8 px-4 sm:px-6">
            <AdminSidebar
              isOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
            <div className="w-full md:ml-4">
              <Suspense fallback={pageLoadingFallback}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        ) : isLearningPage || isStudentDashboard ? (
          // ✅ Learning Page & Student Dashboard - Full width tanpa padding/container
          <div className="w-full">
            <Suspense fallback={pageLoadingFallback}>
              <Outlet />
            </Suspense>
          </div>
        ) : (
          // ✅ Halaman lain - dengan container dan padding normal
          <div className="w-full px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto py-12">
            <Suspense fallback={pageLoadingFallback}>
              <Outlet />
            </Suspense>
          </div>
        )}
      </main>

      {/* Footer - tidak ditampilkan di learning page, student dashboard, admin, dan instructor pages */}
      {!isLearningPage && !isStudentDashboard && !isPanelPage && (
        <div className="relative z-20">
          <Footer />
        </div>
      )}

      {/* Modal auth */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalView === "LOGIN" && <LoginPage />}
        {modalView === "REGISTER" && <RegisterPage />}
        {modalView === "FORGOT_PASSWORD" && <ForgotPasswordPage />}
      </Modal>

      {/* Overlay sidebar mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) toggleSidebar(false);
          }}
        />
      )}
    </div>
  );
};

export default MainLayout;