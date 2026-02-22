import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FaUser, FaSignOutAlt, FaTachometerAlt, FaCreditCard, 
  FaShieldAlt, FaCrown, FaUserCircle, FaBell, FaSearch,
  FaChartBar, FaUsers, FaCog
} from 'react-icons/fa';
import { logout } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, userRole } = useSelector((state) => state.auth);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
    setShowUserMenu(false);
  };

  // Admin Navigation Items
  const adminNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt },
    { name: 'Subscriptions', path: '/admin/subscriptions', icon: FaUsers },
    { name: 'Analytics', path: '/admin/analytics', icon: FaChartBar },
    { name: 'Settings', path: '/admin/settings', icon: FaCog },
  ];

  // User Navigation Items
  const userNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt },
    { name: 'My Subscription', path: '/dashboard#subscription', icon: FaCreditCard },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <FaCreditCard className="text-primary-400 text-2xl group-hover:text-primary-300 transition-colors" />
            <span className="font-bold text-xl text-white group-hover:text-primary-300 transition-colors">
              SubManage
            </span>
          </Link>

          
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/plans"
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200"
            >
              Plans
            </Link>
            
            {isAuthenticated && userRole === 'admin' && (
              <>
                {adminNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 flex items-center space-x-1"
                  >
                    <item.icon className="text-sm" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </>
            )}
            
            {isAuthenticated && userRole === 'user' && (
              <>
                {userNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 flex items-center space-x-1"
                  >
                    <item.icon className="text-sm" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </>
            )}
          </div>

          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
            
                <button className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200">
                  <FaBell />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 focus:outline-none group"
                  >
                   
                    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      userRole === 'admin' 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : 'bg-primary-600 hover:bg-primary-700'
                    }`}>
                      {userRole === 'admin' ? (
                        <FaShieldAlt className="text-white" />
                      ) : (
                        <FaUserCircle className="text-white" />
                      )}
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium text-white">{user?.name}</p>
                        <p className="text-xs opacity-75">
                          {userRole === 'admin' ? 'Administrator' : 'Member'}
                        </p>
                      </div>
                    </div>
                  </button>

                 
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            userRole === 'admin' ? 'bg-purple-100' : 'bg-primary-100'
                          }`}>
                            {userRole === 'admin' ? (
                              <FaShieldAlt className={`${userRole === 'admin' ? 'text-purple-600' : 'text-primary-600'}`} />
                            ) : (
                              <FaUser className={`${userRole === 'admin' ? 'text-purple-600' : 'text-primary-600'}`} />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            userRole === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {userRole === 'admin' ? <FaShieldAlt className="mr-1" /> : <FaCrown className="mr-1" />}
                            {userRole === 'admin' ? 'Admin' : 'Regular User'}
                          </span>
                        </div>
                      </div>

                     
                      <div className="px-2 py-2">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Profile Settings
                        </Link>
                        
                        {userRole === 'admin' && (
                          <Link
                            to="/admin/users"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                            onClick={() => setShowUserMenu(false)}
                          >
                            Manage Users
                          </Link>
                        )}
                        
                        <hr className="my-2" />
                        
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center space-x-2"
                        >
                          <FaSignOutAlt />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden py-2 border-t border-gray-700">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/plans"
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all"
            >
              Plans
            </Link>
            
            {isAuthenticated && userRole === 'admin' && (
              <>
                {adminNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all flex items-center space-x-1"
                  >
                    <item.icon className="text-xs" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </>
            )}
            
            {isAuthenticated && userRole === 'user' && (
              <>
                {userNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all flex items-center space-x-1"
                  >
                    <item.icon className="text-xs" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;