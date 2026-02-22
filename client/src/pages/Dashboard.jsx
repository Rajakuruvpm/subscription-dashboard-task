import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { format, differenceInDays } from 'date-fns';
import { 
  FaCalendar, FaClock, FaCheck, FaExclamationCircle, 
  FaSpinner, FaUser, FaCrown, FaShieldAlt, FaCreditCard 
} from 'react-icons/fa';
import { fetchMySubscription, cancelSubscription, clearError } from '../store/slices/subscriptionSlice';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, isAuthenticated, userRole } = useSelector((state) => state.auth);
  const { mySubscription, isLoading, error, cancelLoading } = useSelector((state) => state.subscription);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      console.log('Not authenticated, redirecting to login');
      navigate('/login', { replace: true });
      return;
    }

    const loadData = async () => {
      try {
        await dispatch(fetchMySubscription()).unwrap();
      } catch (err) {
        if (err === 'Please login to view your subscription' || err === 'Session expired') {
          navigate('/login', { replace: true });
        }
      }
    };

    loadData();
  }, [dispatch, isAuthenticated, user, navigate]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleCancelSubscription = async () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      try {
        await dispatch(cancelSubscription()).unwrap();
        toast.success('Subscription cancelled successfully');
      } catch (error) {
        toast.error(error || 'Failed to cancel subscription');
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FaSpinner className="animate-spin text-4xl text-primary-600 mb-4" />
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }
  const UserInfo = () => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-primary-100 p-3 rounded-full">
            <FaUser className="text-2xl text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {userRole === 'admin' ? (
            <>
              <FaShieldAlt className="text-purple-600" />
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Admin
              </span>
            </>
          ) : (
            <>
              <FaCrown className="text-yellow-600" />
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                User
              </span>
            </>
          )}
        </div>
      </div>
      
      {/* Admin quick link */}
      {userRole === 'admin' && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Link 
            to="/admin/subscriptions" 
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700"
          >
            <FaShieldAlt />
            <span>Go to Admin Dashboard</span>
          </Link>
        </div>
      )}
    </div>
  );
  if (!mySubscription) {
    return (
      <div className="max-w-4xl mx-auto">
        <UserInfo />
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <FaExclamationCircle className="mx-auto text-4xl text-yellow-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">No Active Subscription</h2>
          <p className="text-gray-600 mb-8">You don't have any active subscription at the moment.</p>
          <button
            onClick={() => navigate('/plans')}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
          >
            <FaCreditCard />
            <span>View Plans</span>
          </button>
        </div>
      </div>
    );
  }
  const daysRemaining = differenceInDays(new Date(mySubscription.endDate), new Date());
  const expired = new Date(mySubscription.endDate) < new Date();

  return (
    <div className="max-w-4xl mx-auto">
      <UserInfo />
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-primary-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
            <FaCrown />
            <span>Current Subscription</span>
          </h2>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            expired
              ? 'bg-red-200 text-red-800'
              : mySubscription.status === 'active'
              ? 'bg-green-200 text-green-800'
              : 'bg-yellow-200 text-yellow-800'
          }`}>
            {expired ? 'Expired' : mySubscription.status?.charAt(0).toUpperCase() + mySubscription.status?.slice(1)}
          </span>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {mySubscription.plan?.name || 'Unknown'} Plan
              </h3>
              <p className="text-gray-600">
                ${mySubscription.plan?.price || 0} / {mySubscription.plan?.duration || 30} days
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center space-x-3">
              <FaCalendar className="text-primary-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-semibold">
                  {format(new Date(mySubscription.startDate), 'PPP')}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FaClock className="text-primary-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="font-semibold">
                  {format(new Date(mySubscription.endDate), 'PPP')}
                </p>
              </div>
            </div>
          </div>

          {!expired && mySubscription.status === 'active' && daysRemaining > 0 && (
            <div className="mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  <span className="font-semibold">{daysRemaining} days</span> remaining in your subscription
                </p>
              </div>
            </div>
          )}

          {mySubscription.plan?.features?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Features:</h4>
              <ul className="space-y-2">
                {mySubscription.plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {mySubscription.status === 'active' && !expired && (
            <button
              onClick={handleCancelSubscription}
              disabled={cancelLoading}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelLoading ? 'Cancelling...' : 'Cancel Subscription'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;