const mongoose = require('mongoose');
const Plan = require('../models/Plan');
require('dotenv').config();

const plans = [
  {
    name: 'Basic',
    price: 9.99,
    features: [
      'Access to basic features',
      'Email support',
      '1 user',
      '5GB storage',
      'Basic analytics'
    ],
    duration: 30
  },
  {
    name: 'Pro',
    price: 29.99,
    features: [
      'All Basic features',
      'Priority support',
      '5 users',
      '50GB storage',
      'Advanced analytics',
      'API access'
    ],
    duration: 30
  },
  {
    name: 'Enterprise',
    price: 99.99,
    features: [
      'All Pro features',
      '24/7 phone support',
      'Unlimited users',
      '500GB storage',
      'Custom integrations',
      'SLA guarantee',
      'Dedicated account manager'
    ],
    duration: 30
  },
  {
    name: 'Premium',
    price: 199.99,
    features: [
      'All Enterprise features',
      'White-label solution',
      'Unlimited storage',
      'Advanced security',
      'Custom development',
      'Training sessions',
      'Early access to new features'
    ],
    duration: 365
  }
];

const seedPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing plans
    await Plan.deleteMany({});
    console.log('Cleared existing plans');

    // Insert new plans
    await Plan.insertMany(plans);
    console.log('Sample plans seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding plans:', error);
    process.exit(1);
  }
};

seedPlans();