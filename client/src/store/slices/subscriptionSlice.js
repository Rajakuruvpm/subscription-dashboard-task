import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosConfig';
export const fetchMySubscription = createAsyncThunk(
  'subscription/fetchMySubscription',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching subscription...');
      const response = await axiosInstance.get('/my-subscription');
      return response.data.data;
    } catch (error) {
      console.error('Fetch subscription error:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        return rejectWithValue('Please login to view your subscription');
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch subscription');
    }
  }
);
export const subscribeToPlan = createAsyncThunk(
  'subscription/subscribe',
  async (planId, { rejectWithValue, getState }) => {
    try {
      console.log('Subscribing to plan:', planId);
      const { auth } = getState();
      if (!auth.isAuthenticated) {
        return rejectWithValue('Please login to subscribe');
      }
      
      const response = await axiosInstance.post(`/subscribe/${planId}`);
      console.log('Subscribe response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Subscribe error:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        return rejectWithValue('Session expired. Please login again.');
      }
      
      return rejectWithValue(error.response?.data?.message || 'Subscription failed');
    }
  }
);
export const cancelSubscription = createAsyncThunk(
  'subscription/cancel',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Cancelling subscription...');
      const response = await axiosInstance.put('/subscription/cancel');
      console.log('Cancel response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Cancel error:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        return rejectWithValue('Please login to cancel subscription');
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel subscription');
    }
  }
);
export const fetchAllSubscriptions = createAsyncThunk(
  'subscription/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      console.log('Fetching all subscriptions with params:', params);
      const response = await axiosInstance.get('/admin/subscriptions', { params });
      console.log('All subscriptions response:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Fetch all subscriptions error:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        return rejectWithValue('Please login as admin');
      } else if (error.response?.status === 403) {
        return rejectWithValue('You do not have admin access');
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch subscriptions');
    }
  }
);

// Initial state
const initialState = {
  mySubscription: null,
  allSubscriptions: [],
  pagination: null,
  isLoading: false,
  error: null,
  subscribeLoading: false,
  cancelLoading: false,
  lastFetched: null
};

// Create slice
const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSubscription: (state) => {
      state.mySubscription = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch my subscription cases
      .addCase(fetchMySubscription.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMySubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mySubscription = action.payload;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchMySubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Subscribe to plan cases
      .addCase(subscribeToPlan.pending, (state) => {
        state.subscribeLoading = true;
        state.error = null;
      })
      .addCase(subscribeToPlan.fulfilled, (state, action) => {
        state.subscribeLoading = false;
        state.mySubscription = action.payload;
        state.error = null;
      })
      .addCase(subscribeToPlan.rejected, (state, action) => {
        state.subscribeLoading = false;
        state.error = action.payload;
      })
      
      // Cancel subscription cases
      .addCase(cancelSubscription.pending, (state) => {
        state.cancelLoading = true;
        state.error = null;
      })
      .addCase(cancelSubscription.fulfilled, (state) => {
        state.cancelLoading = false;
        state.mySubscription = null;
        state.error = null;
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.cancelLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllSubscriptions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllSubscriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allSubscriptions = action.payload.subscriptions || [];
        state.pagination = action.payload.pagination || null;
        state.error = null;
      })
      .addCase(fetchAllSubscriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.allSubscriptions = [];
        state.error = action.payload;
      });
  }
});
export const { clearError, clearSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;