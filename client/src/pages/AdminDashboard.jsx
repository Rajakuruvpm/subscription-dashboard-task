import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaCreditCard, FaChartBar, FaCog, FaSpinner } from 'react-icons/fa';
import { fetchAllSubscriptions } from '../store/slices/subscriptionSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);
  const { allSubscriptions, isLoading } = useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(fetchAllSubscriptions());
  }, [dispatch]);

  const stats = [
    {
      title: 'Total Subscriptions',
      value: allSubscriptions?.length || 0,
      icon: FaCreditCard,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Users',
      value: allSubscriptions?.filter(s => s.status === 'active').length || 0,
      icon: FaUsers,
      color: 'bg-green-500'
    },
    {
      title: 'Revenue',
      value: `$${allSubscriptions?.reduce((acc, sub) => acc + (sub.plan?.price || 0), 0) || 0}`,
      icon: FaChartBar,
      color: 'bg-purple-500'
    },
    {
      title: 'Expired',
      value: allSubscriptions?.filter(s => s.status === 'expired').length || 0,
      icon: FaCog,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-purple-100 mt-1">Welcome back, {user?.name}</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white text-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => navigate('/admin/subscriptions')}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-left"
        >
          <FaCreditCard className="text-2xl text-purple-600 mb-3" />
          <h3 className="font-semibold text-gray-800">Manage Subscriptions</h3>
          <p className="text-sm text-gray-600 mt-1">View and manage all user subscriptions</p>
        </button>

        <button
          onClick={() => navigate('/admin/users')}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-left"
        >
          <FaUsers className="text-2xl text-purple-600 mb-3" />
          <h3 className="font-semibold text-gray-800">Manage Users</h3>
          <p className="text-sm text-gray-600 mt-1">View and manage user accounts</p>
        </button>

        <button
          onClick={() => navigate('/admin/analytics')}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-left"
        >
          <FaChartBar className="text-2xl text-purple-600 mb-3" />
          <h3 className="font-semibold text-gray-800">Analytics</h3>
          <p className="text-sm text-gray-600 mt-1">View detailed analytics and reports</p>
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Subscriptions</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <FaSpinner className="animate-spin text-3xl text-purple-600" />
          </div>
        ) : (
          <div className="space-y-4">
            {allSubscriptions?.slice(0, 5).map((sub) => (
              <div key={sub._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{sub.user?.name}</p>
                  <p className="text-sm text-gray-500">{sub.plan?.name} Plan</p>
                </div>
                <div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    sub.status === 'active' ? 'bg-green-100 text-green-800' :
                    sub.status === 'expired' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {sub.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;