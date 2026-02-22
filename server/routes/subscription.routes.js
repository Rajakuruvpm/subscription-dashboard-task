const express = require('express');
const router = express.Router();
const {
  subscribeToPlan,
  getMySubscription,
  cancelSubscription
} = require('../controllers/subscription.controller');
const { protect } = require('../middleware/auth');

router.post('/subscribe/:planId', protect, subscribeToPlan);
router.get('/my-subscription', protect, getMySubscription);
router.put('/subscription/cancel', protect, cancelSubscription);

module.exports = router;