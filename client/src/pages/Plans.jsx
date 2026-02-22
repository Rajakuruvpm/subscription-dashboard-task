import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlans } from '../store/slices/planSlice';
import { fetchMySubscription } from '../store/slices/subscriptionSlice';
import PlanCard from '../components/PlanCard';
import { FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Plans = () => {
  const dispatch = useDispatch();
  const { plans, isLoading: plansLoading, error: plansError } = useSelector((state) => state.plans);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { isLoading: subLoading } = useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(fetchPlans());
    if (isAuthenticated && user) {
      dispatch(fetchMySubscription());
    }
  }, [dispatch, isAuthenticated, user]);

  useEffect(() => {
    if (plansError) {
      toast.error(plansError);
    }
  }, [plansError]);

  if (plansLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <FaSpinner className="animate-spin text-4xl text-primary-600 mb-4" />
        <p className="text-gray-600">Loading plans...</p>
      </div>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Plans Available</h2>
        <p className="text-gray-600">Please check back later.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Plan</h1>
        <p className="text-xl text-gray-600">Select the perfect plan for your needs</p>
        {!isAuthenticated && (
          <p className="mt-4 text-sm text-gray-500">
            Please <button onClick={() => window.location.href = '/login'} className="text-primary-600 hover:underline">login</button> to subscribe to a plan
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => (
          <PlanCard key={plan._id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Plans;