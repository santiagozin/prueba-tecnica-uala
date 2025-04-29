import Avatar from "@/components/avatar";
import avatarImage from "@/assets/avatar.png";
import logoSimple from "@/assets/logo-simple.svg";

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
  isMobile: boolean;
}

const Header = ({ onMenuClick, isMobile }: HeaderProps) => {
  return (
    <header
      className={`z-6 h-20 w-full fixed top-0 bg-white md:shadow-sm border-header ${
        isMobile ? "rounded-bl-[32px]" : "rounded-bl-0"
      }`}
    >
      <div className="flex justify-between items-center h-full px-6 relative">
        {isMobile ? (
          <div className="flex items-center gap-4 w-full">
            <button
              onClick={onMenuClick}
              className="p-2 focus:outline-none text-gray-700 absolute left-6 hover:cursor-pointer hover:scale-110 transition-all duration-300"
              aria-label="Menú"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center gap-4 mx-auto">
              <img src={logoSimple} alt="Logo" className="w-20 h-auto" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Avatar src={avatarImage} alt="Avatar" />
            <span className="text-lg font-medium text-gray-700">Name</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
