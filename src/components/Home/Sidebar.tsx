import type { JSX } from 'react';
import { NavLink } from 'react-router-dom';

type SidebarItem = {
  label: string;
  to: string;
  icon: JSX.Element;
};


const Sidebar = ({ items }: { items: SidebarItem[] }) => (
  <aside
    id="separator-sidebar"
    className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
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
    </div>
  </aside>
);

export default Sidebar;
