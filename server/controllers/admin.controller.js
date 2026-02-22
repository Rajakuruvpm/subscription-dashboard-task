const Subscription = require('../models/Subscription');
const User = require('../models/User');
const getAllSubscriptions = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) {
      query.status = status;
    }

    const subscriptions = await Subscription.find(query)
      .populate('user', 'name email')
      .populate('plan')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Subscription.countDocuments(query);

    res.json({
      success: true,
      data: {
        subscriptions,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password -refreshToken');
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};
const updateSubscription = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    subscription.status = status;
    await subscription.save();

    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSubscriptions,
  getAllUsers,
  updateSubscription
};