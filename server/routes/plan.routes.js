const express = require('express');
const router = express.Router();
const { getPlans, getPlan } = require('../controllers/plan.controller');
const { protect } = require('../middleware/auth');

router.get('/', getPlans);
router.get('/:id', protect, getPlan);

module.exports = router;