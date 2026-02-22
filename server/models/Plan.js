const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Basic', 'Pro', 'Enterprise', 'Premium']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  features: [{
    type: String,
    required: true
  }],
  duration: {
    type: Number,
    required: true,
    min: 1,
    default: 30 // days
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);