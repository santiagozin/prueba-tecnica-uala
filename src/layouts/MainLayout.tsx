import { Outlet } from "react-router-dom";
import Sidebar from "@/components/custom/Sidebar";
import Header from "@/components/custom/Header";
import { useState, useEffect } from "react";

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleOverlayClick = () => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div
        className={`fixed left-0 top-0 h-full z-50 ${
          isMobile ? "z-20" : ""
        } transition-transform duration-300 ${
          isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <Sidebar onClose={handleCloseSidebar} isMobile={isMobile} />
      </div>

      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-12"
          onClick={handleOverlayClick}
        />
      )}

      <div
        className={`flex flex-col flex-1 ${
          !isMobile ? "ml-[280px]" : ""
        } transition-all duration-300`}
      >
        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
        />
        <main className="pt-10 md:pt-20 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
