import { useDispatch, useSelector } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import { subscribeToPlan, fetchMySubscription } from '../store/slices/subscriptionSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PlanCard = ({ plan }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { mySubscription, subscribeLoading } = useSelector((state) => state.subscription);

  if (!plan) {
    return null;
  }

  const handleSubscribe = async () => {
    if (!isAuthenticated || !user) {
      toast.error('Please login to subscribe');
      navigate('/login');
      return;
    }

    if (mySubscription) {
      toast.error('You already have an active subscription');
      return;
    }

    try {
      console.log('Subscribing to plan:', plan._id);
      
      
      const result = await dispatch(subscribeToPlan(plan._id)).unwrap();
      console.log('Subscription result:', result);
    
      toast.success(`Successfully subscribed to ${plan.name} plan!`);
      await dispatch(fetchMySubscription());
      
    } catch (error) {
      console.error('Subscription error:', error);
      if (error === 'Please login to subscribe' || error === 'Session expired. Please login again.') {
        toast.error('Please login to continue');
        navigate('/login');
      } else {
        toast.error(error || 'Subscription failed');
      }
    }
  };

 
  const isCurrentPlan = mySubscription?.plan?._id === plan._id;

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 p-6 ${
      isCurrentPlan ? 'ring-2 ring-primary-500' : ''
    }`}>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-primary-600">${plan.price}</span>
          <span className="text-gray-500">/{plan.duration} days</span>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {plan.features && plan.features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-2">
            <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        disabled={isCurrentPlan || subscribeLoading}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          isCurrentPlan
            ? 'bg-gray-300 cursor-not-allowed text-gray-600'
            : subscribeLoading
            ? 'bg-primary-400 cursor-wait text-white'
            : 'bg-primary-600 text-white hover:bg-primary-700'
        }`}
      >
        {subscribeLoading 
          ? 'Subscribing...' 
          : isCurrentPlan 
            ? 'Current Plan' 
            : 'Subscribe Now'}
      </button>
      
      {!isAuthenticated && (
        <p className="text-xs text-center mt-3 text-gray-500">
          Please <button onClick={() => navigate('/login')} className="text-primary-600 hover:underline">login</button> to subscribe
        </p>
      )}
    </div>
  );
};

export default PlanCard;