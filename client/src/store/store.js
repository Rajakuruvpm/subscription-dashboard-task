import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import planReducer from './slices/planSlice';
import subscriptionReducer from './slices/subscriptionSlice';

console.log('📦 Reducer imports:');
console.log('   - authReducer:', authReducer ? '✅' : '❌');
console.log('   - planReducer:', planReducer ? '✅' : '❌');
console.log('   - subscriptionReducer:', subscriptionReducer ? '✅' : '❌');

if (!authReducer || !planReducer || !subscriptionReducer) {
  throw new Error('❌ One or more reducers failed to load');
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    plans: planReducer,
    subscription: subscriptionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'auth/login/fulfilled',
          'auth/register/fulfilled',
          'subscription/fetchMySubscription/fulfilled',
          'subscription/subscribe/fulfilled'
        ],
        ignoredPaths: [
          'auth.user',
          'subscription.mySubscription',
          'subscription.allSubscriptions'
        ]
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

console.log('✅ Store configured successfully');