import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'store/slices/authSlice';
import Button from 'components/ui/Button';

const AdminLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin');
    };

    const isActive = (path) => location.pathname.includes(path);

    const navItems = [
        { label: 'Stock', path: '/admin/stock' },
        { label: 'Bestsellers', path: '/admin/bestsellers' },
        { label: 'Announcements', path: '/admin/announcements' },
        { label: 'Payments', path: '/admin/payments' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="font-bold text-xl tracking-tight">Admin Panel</span>
                            <div className="hidden md:ml-10 md:flex md:space-x-4">
                                {navItems.map((item) => (
                                    <button
                                        key={item.path}
                                        onClick={() => navigate(item.path)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.path)
                                                ? 'bg-black text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate('/')}
                            >
                                View Store
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLogout}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Mobile Menu (simplified) */}
                <div className="md:hidden border-t border-gray-200">
                    <div className="flex justify-around p-2">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`text-xs p-1 ${isActive(item.path) ? 'font-bold' : ''}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
