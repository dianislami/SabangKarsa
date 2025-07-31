import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toogle';

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin/dashboard',
    active: true
  },
  {
    id: 'users',
    label: 'Pengguna',
    icon: Users,
    path: '/admin/users',
    active: false
  },
  {
    id: 'verifikasi',
    label: 'Verifikasi',
    icon: Shield,
    path: '/admin/verifikasi',
    active: false
  },
  {
    id: 'documents',
    label: 'Dokumen',
    icon: FileText,
    path: '/admin/documents',
    active: false
  },
  {
    id: 'settings',
    label: 'Pengaturan',
    icon: Settings,
    path: '/admin/settings',
    active: false
  }
];

export function AdminSidebar({ isCollapsed, setIsCollapsed }: AdminSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="h-screen bg-admin-card border-r border-admin flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-admin">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-admin">
                  JakSabang Admin
                </h2>
                <p className="text-xs text-admin-muted">
                  Panel Administrasi
                </p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || activeItem === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  if (item.path) navigate(item.path);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-admin-muted hover:bg-admin hover:text-admin'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-admin space-y-3">
        {!isCollapsed && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-admin-muted">
              Theme
            </span>
            <ThemeToggle />
          </div>
        )}
        
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Keluar</span>}
        </Button>
      </div>
    </motion.div>
  );
}
