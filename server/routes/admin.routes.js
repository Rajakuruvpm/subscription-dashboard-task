const express = require('express');
const router = express.Router();
const {
  getAllSubscriptions,
  getAllUsers,
  updateSubscription
} = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth');
router.use(protect, authorize('admin'));

router.get('/subscriptions', getAllSubscriptions);
router.get('/users', getAllUsers);
router.put('/subscriptions/:id', updateSubscription);

module.exports = router;