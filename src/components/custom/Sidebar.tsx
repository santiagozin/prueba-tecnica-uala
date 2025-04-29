import { NavLink } from "react-router";
import logoImage from "@/assets/logo.svg";
import { navigation } from "@/config/navigation";
import googleImage from "@/assets/appstores/google.svg";
import appleImage from "@/assets/appstores/apple.svg";

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export default function Sidebar({ onClose, isMobile = false }: SidebarProps) {
  return (
    <aside className=" w-[280px] bg-white h-screen py-8 px-6 shadow-[5px_4px_14px_4px_rgba(231,_238,_255,_0.5)] z-10 flex flex-col overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <img src={logoImage} alt="Logo" className="w-28 h-auto" />

        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Cerrar menú"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <nav className="flex-grow">
        <ul className="space-y-6 mt-4">
          {navigation.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 text-secondary font-medium my-4"
                    : "flex items-center gap-2 text-[#3A3A3A] hover:text-secondary transition-colors my-4"
                }
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto mx-auto">
        <h3 className="text-sm text-gray-700 mb-4 font-medium">Descargá la app desde</h3>
        <a href="/" target="_blank">
          <img src={appleImage} alt="Apple" className="w-36 h-auto mb-4 hover:scale-105 transition-all duration-300" />
        </a>
        <a href="/" target="_blank">
          <img src={googleImage} alt="Google" className="w-36 h-auto hover:scale-105 transition-all duration-300" />
        </a>
      </div>
    </aside>
  );
}
