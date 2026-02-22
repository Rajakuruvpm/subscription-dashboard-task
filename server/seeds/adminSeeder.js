// server/seeds/adminSeeder.js
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const User = require('../models/User');

const createAdminUser = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing test users (optional)
    console.log('🧹 Cleaning up existing test users...');
    await User.deleteMany({ email: { $in: ['admin@example.com', 'user@example.com'] } });
    console.log('✅ Cleanup complete');

    // Create admin user
    console.log('\n👤 Creating admin user...');
    const admin = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin user created successfully:');
    console.log('   ID:', admin._id);
    console.log('   Name:', admin.name);
    console.log('   Email:', admin.email);
    console.log('   Role:', admin.role);
    console.log('   Password: admin123');

    // Create regular test user
    console.log('\n👤 Creating regular test user...');
    const user = new User({
      name: 'Test User',
      email: 'user@example.com',
      password: 'user123',
      role: 'user'
    });

    await user.save();
    console.log('✅ Test user created successfully:');
    console.log('   ID:', user._id);
    console.log('   Name:', user.name);
    console.log('   Email:', user.email);
    console.log('   Role:', user.role);
    console.log('   Password: user123');

    // Verify password hashing
    console.log('\n🔐 Verifying password hashing...');
    const isAdminPasswordValid = await admin.comparePassword('admin123');
    const isUserPasswordValid = await user.comparePassword('user123');
    
    console.log('   Admin password valid:', isAdminPasswordValid ? '✅' : '❌');
    console.log('   User password valid:', isUserPasswordValid ? '✅' : '❌');

    // List all users
    const users = await User.find({});
    console.log('\n📊 All users in database:', users.length);
    users.forEach(u => {
      console.log(`   - ${u.email} (${u.role})`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
    console.log('\n🎉 Seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

// Run the seeder
createAdminUser();