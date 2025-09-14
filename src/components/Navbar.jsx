import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useModalStore from '/src/store/modalStore.js';
import useAuthStore from '/src/store/authStore.js';
import useToastStore from '/src/store/toastStore.js';
import { ThemeContext } from '/src/context/ThemeContext.jsx';
import { getDashboardPath } from '../utils/getDashboardPath';
import { Sun, Moon, LogOut, Search, User, Menu, X, Home, BookOpen, Settings, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleTheme } = useContext(ThemeContext);
  const { openModal } = useModalStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { confirm, success } = useToastStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    confirm('Apakah Anda yakin ingin keluar dari akun?', {
      title: 'Konfirmasi Logout',
      actions: [
        {
          label: 'Batal',
          handler: () => {},
          primary: false
        },
        {
          label: 'Logout',
          handler: () => {
            logout();
            navigate('/');
            setIsMenuOpen(false);
            setIsProfileDropdownOpen(false);
            success('Berhasil logout dari akun Anda');
          },
          primary: true
        }
      ]
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${searchQuery.trim()}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const dashboardPath = getDashboardPath(user);
  const isAdminPage =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/instructor');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    const event = new CustomEvent('toggleSidebar');
    window.dispatchEvent(event);
  };

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const closeMenu = () => setIsMenuOpen(false);
  const closeDropdown = () => setIsProfileDropdownOpen(false);

  // Menu items untuk authenticated users
  const authenticatedMenuItems = [
    {
      label: 'Home',
      icon: Home,
      path: '/',
      action: () => {
        navigate('/');
        closeMenu();
      }
    },
    {
      label: 'Dashboard',
      icon: BookOpen,
      path: dashboardPath,
      action: () => {
        navigate(dashboardPath);
        closeMenu();
      }
    },
    {
      label: 'Tentang',
      icon: User,
      path: '/about',
      action: () => {
        navigate('/about');
        closeMenu();
      }
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/settings',
      action: () => {
        navigate('/settings');
        closeMenu();
      }
    }
  ];

  // Desktop navigation items
  const desktopNavItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Kursus', path: '/courses', icon: BookOpen },
    { label: 'Tentang', path: '/about', icon: User },
    { label: 'Kontak', path: '/contact', icon: Settings }
  ];

  return (
    <>
      <header
          className={`bg-white fixed top-0 left-0 right-0 w-full shadow-lg border-b border-gray-100 transition-all duration-300 ${
            isMenuOpen ? 'z-30 opacity-50' : 'z-50 opacity-100'
          }`}
        >
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Section */}
            <div className="flex items-center space-x-8">
              {/* Sidebar Toggle untuk Admin */}
              {isAdminPage && (
                <button
                  className="lg:hidden p-2 text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={toggleSidebar}
                  aria-label="Toggle sidebar"
                >
                  <Menu className="h-5 w-5" />
                </button>
              )}

              {/* Logo */}
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img
                  src="/purple_navbar_logo.svg"
                  alt="DiBelajar.in"
                  className="h-10 w-auto hover:scale-105 transition-transform duration-200"
                />
              </Link>

              {/* Desktop Navigation Menu */}
              {!isAdminPage && (
                <nav className="hidden lg:flex items-center space-x-2">
                  {desktopNavItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={index}
                        to={item.path}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                          isActive
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-gray-700 border border-gray-300 hover:border-primary hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              )}
            </div>

            {/* Center Section - Desktop Search */}
            {!isAdminPage && (
              <div className="hidden md:flex flex-1 max-w-lg mx-8">
                {!isAuthenticated && (
                  <form onSubmit={handleSearchSubmit} className="w-full relative">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Cari kursus apa saja..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-gray-50 hover:bg-white transition-all duration-200 text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              
              {/* Mobile Search Button */}
              {!isAdminPage && !isAuthenticated && (
                <button
                  onClick={toggleSearch}
                  className="md:hidden p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  aria-label="Toggle search"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}

              {/* Desktop Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="hidden sm:block p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                title="Ganti Tema"
              >
                <Sun className="h-5 w-5 hidden dark:block" />
                <Moon className="h-5 w-5 block dark:hidden" />
              </button>

              {/* Authentication Section */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  {/* Desktop User Menu */}
                  <div className="hidden sm:flex items-center space-x-3">
                    {/* User Dropdown */}
                    <div className="relative">
                      <button
                        onClick={toggleProfileDropdown}
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-all duration-200"
                      >
                        <User className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-gray-700 hidden lg:block">
                          {user?.name}
                        </span>
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </button>

                      {/* Dropdown Menu */}
                      {isProfileDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                          </div>
                          
                          <div className="py-2">
                            <Link
                              to={dashboardPath}
                              onClick={closeDropdown}
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                            >
                              <BookOpen className="h-4 w-4" />
                              <span>Dashboard</span>
                            </Link>
                            <Link
                              to="/profile"
                              onClick={closeDropdown}
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                            >
                              <User className="h-4 w-4" />
                              <span>Profile</span>
                            </Link>
                            <Link
                              to="/settings"
                              onClick={closeDropdown}
                              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                            >
                              <Settings className="h-4 w-4" />
                              <span>Settings</span>
                            </Link>
                            <button
                              onClick={toggleTheme}
                              className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                            >
                              <Sun className="h-4 w-4 hidden dark:block" />
                              <Moon className="h-4 w-4 block dark:hidden" />
                              <span>Ganti Tema</span>
                            </button>
                          </div>
                          
                          <div className="border-t border-gray-100 pt-2">
                            <button
                              onClick={handleLogout}
                              className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <LogOut className="h-4 w-4" />
                              <span>Logout</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Menu Button for Authenticated Users */}
                  <button
                    className="sm:hidden p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                  >
                    {isMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </button>
                </div>
              ) : (
                <>
                  {/* Desktop Auth Buttons */}
                  <div className="hidden md:flex items-center space-x-2">
                    <button
                      onClick={() => openModal('LOGIN')}
                      className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-200"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => openModal('REGISTER')}
                      className="bg-primary text-white px-4 py-2 text-sm font-medium rounded-full hover:bg-primary/90 transition-all duration-200 shadow-sm"
                    >
                      Register
                    </button>
                  </div>

                  {/* Mobile Menu Button for Guest Users */}
                  <button
                    className="md:hidden p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                  >
                    {isMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {!isAdminPage && !isAuthenticated && isSearchOpen && (
          <div className="md:hidden border-t border-gray-100 p-4 bg-white">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari kursus apa saja..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-gray-50 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <img
            src="/purple_navbar_logo.svg"
            alt="DiBelajar.in Logo"
            className="h-8"
          />
            <button
              onClick={closeMenu}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isAuthenticated ? (
              /* Authenticated User Menu */
              <div className="p-4 space-y-6">
                {/* User Profile Section */}
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* Search Section for Authenticated Users */}
                {!isAdminPage && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Pencarian</h3>
                    <form onSubmit={handleSearchSubmit}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Cari kursus apa saja..."
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                )}

                {/* Navigation Menu */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Navigasi</h3>
                  <nav className="space-y-1">
                    {authenticatedMenuItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      
                      return (
                        <button
                          key={index}
                          onClick={item.action}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                            isActive
                              ? 'bg-primary text-white shadow-lg'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                          }`}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Theme Toggle */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Pengaturan</h3>
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary rounded-lg transition-all duration-200"
                  >
                    <Sun className="h-5 w-5 hidden dark:block" />
                    <Moon className="h-5 w-5 block dark:hidden" />
                    <span className="text-sm font-medium">Ganti Tema</span>
                  </button>
                </div>

                {/* Logout Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Guest User Menu */
              <div className="p-4 space-y-6">
                {/* Search Section */}
                {!isAdminPage && (
                  <div className="space-y-3">
                    <form onSubmit={handleSearchSubmit}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Cari kursus apa saja..."
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                )}

                {/* Navigation for Guests */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Navigasi</h3>
                  <nav className="space-y-1">
                    {desktopNavItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      
                      return (
                        <Link
                          key={index}
                          to={item.path}
                          onClick={closeMenu}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-primary text-white shadow-lg'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Theme Toggle */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Pengaturan</h3>
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary rounded-lg transition-all duration-200"
                  >
                    <Sun className="h-5 w-5 hidden dark:block" />
                    <Moon className="h-5 w-5 block dark:hidden" />
                    <span className="text-sm font-medium">Ganti Tema</span>
                  </button>
                </div>

                {/* Auth Buttons */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      openModal('LOGIN');
                      closeMenu();
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    <User className="h-4 w-4" />
                    <span className="font-medium">Login</span>
                  </button>
                  <button
                    onClick={() => {
                      openModal('REGISTER');
                      closeMenu();
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg"
                  >
                    <span className="font-medium">Register Sekarang</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add padding top to body to compensate for fixed navbar */}
      <div className="pt-16">
        {/* This div adds padding to prevent content from being hidden behind fixed navbar */}
      </div>
      {(isMenuOpen || isSearchOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden"
          onClick={() => {
            setIsMenuOpen(false);
            setIsSearchOpen(false);
          }}
        />
      )}

      {/* Desktop Dropdown Overlay */}
      {isProfileDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeDropdown}
        />
      )}
    </>
  );
};

export default Navbar;