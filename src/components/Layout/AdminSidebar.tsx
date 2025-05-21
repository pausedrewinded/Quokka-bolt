import React from 'react';
import { NavLink } from 'react-router-dom';
import { Trophy, LayoutGrid, Settings, Users, LogOut } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const navItems = [
    { icon: LayoutGrid, label: 'Dashboard', path: '/admin' },
    { icon: Trophy, label: 'Competitions', path: '/admin/competitions' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Trophy className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">Admin Portal</span>
        </div>
      </div>
      
      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                isActive ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-500' : ''
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
        <button className="flex items-center text-gray-700 hover:text-gray-900">
          <LogOut className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;