import Modal from '../Modal';
import { useState, type JSX } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 


type SidebarItem = {
  label: string;
  to: string;
  icon: JSX.Element;
};


interface SidebarProps {
  items: SidebarItem[];
  isOpen: boolean;
  onClose: () => void;
}


const Sidebar = ({ items, isOpen, onClose }: SidebarProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();  

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await fetch("http://127.0.0.1:8000/api/v1/logout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      } 
      else {
        const data = await response.json();
        console.error("Failed to logout:", data);
      }
    } 
    catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <aside
        id="separator-sidebar"
        className={`font-Geist fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-50 dark:bg-gray-800
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <button
            className="sm:hidden mb-4 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1"
            onClick={onClose}
          >
            ✕
          </button>

          <ul className="space-y-2 font-medium">
            {items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group ${
                      isActive
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  {item.icon}
                  <span className="ms-3">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Logout Button */}
          <div className="mt-3 ml-3"> 
            <button
              type="button"
              className="inline-flex items-center py-2 px-3 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => setIsModalOpen(true)}
            >
              <svg
                className="shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div> 
      </aside>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          title="Confirm Logout"
          message="Are you sure you want to log out? You will need to sign in again to continue."
          confirmLabel="Logout"
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleLogout}
          confirmClass="bg-red-600 hover:bg-red-500"
        />
      )}
    </>
  );
};

export default Sidebar;
