// // // controllers/auth.controller.js - Fix login function

// // // @desc    Login user
// // // @route   POST /api/auth/login
// // const login = async (req, res, next) => {
// //   try {
// //     console.log('Login attempt:', req.body); // Debug log

// //     const errors = validationResult(req);
// //     if (!errors.isEmpty()) {
// //       console.log('Validation errors:', errors.array());
// //       return res.status(400).json({
// //         success: false,
// //         errors: errors.array()
// //       });
// //     }

// //     const { email, password } = req.body;

// //     // Check if user exists
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       console.log('User not found:', email);
// //       return res.status(401).json({
// //         success: false,
// //         message: 'Invalid credentials'
// //       });
// //     }

// //     console.log('User found:', user.email);
// //     console.log('Stored password hash:', user.password);

// //     // Check password
// //     const isPasswordMatch = await bcrypt.compare(password, user.password);
// //     console.log('Password match:', isPasswordMatch);

// //     if (!isPasswordMatch) {
// //       return res.status(401).json({
// //         success: false,
// //         message: 'Invalid credentials'
// //       });
// //     }

// //     // Generate tokens
// //     const { accessToken, refreshToken } = generateTokens(user._id);

// //     // Save refresh token
// //     user.refreshToken = refreshToken;
// //     await user.save();

// //     res.json({
// //       success: true,
// //       data: {
// //         _id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         role: user.role,
// //         accessToken,
// //         refreshToken
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Login error:', error);
// //     next(error);
// //   }
// // };









// // controllers/auth.controller.js - MINIMAL VERSION FOR TESTING
// // const jwt = require('jsonwebtoken');
// // const bcrypt = require('bcryptjs');
// // const User = require('../models/User');
// // const { validationResult } = require('express-validator');

// // console.log('🔧 Initializing auth.controller.js (minimal version)');

// // // Generate tokens helper
// // const generateTokens = (userId) => {
// //   console.log('Generating tokens for user:', userId);
  
// //   const accessToken = jwt.sign(
// //     { id: userId },
// //     process.env.JWT_ACCESS_SECRET || 'temp-access-secret',
// //     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
// //   );

// //   const refreshToken = jwt.sign(
// //     { id: userId },
// //     process.env.JWT_REFRESH_SECRET || 'temp-refresh-secret',
// //     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
// //   );

// //   return { accessToken, refreshToken };
// // };

// // // Register
// // const register = async (req, res) => {
// //   console.log('📥 REGISTER called with body:', req.body);
  
// //   try {
// //     res.status(201).json({
// //       success: true,
// //       message: 'Register endpoint working',
// //       data: {
// //         _id: 'test-id',
// //         name: req.body.name,
// //         email: req.body.email,
// //         role: 'user',
// //         accessToken: 'test-token',
// //         refreshToken: 'test-refresh-token'
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Register error:', error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Login
// // const login = async (req, res) => {
// //   console.log('📥 LOGIN called with body:', req.body);
  
// //   try {
// //     res.json({
// //       success: true,
// //       data: {
// //         _id: 'test-id',
// //         name: 'Test User',
// //         email: req.body.email,
// //         role: 'user',
// //         accessToken: 'test-token',
// //         refreshToken: 'test-refresh-token'
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Login error:', error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Refresh Token
// // const refreshToken = async (req, res) => {
// //   console.log('📥 REFRESH TOKEN called');
  
// //   try {
// //     res.json({
// //       success: true,
// //       data: {
// //         accessToken: 'new-test-token',
// //         refreshToken: 'new-test-refresh-token'
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Refresh error:', error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Logout
// // const logout = async (req, res) => {
// //   console.log('📥 LOGOUT called');
  
// //   try {
// //     res.json({
// //       success: true,
// //       message: 'Logged out successfully'
// //     });
// //   } catch (error) {
// //     console.error('Logout error:', error);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // Export all functions
// // console.log('📤 Exporting auth controller functions:', {
// //   register: typeof register,
// //   login: typeof login,
// //   refreshToken: typeof refreshToken,
// //   logout: typeof logout
// // });

// // module.exports = {
// //   register,
// //   login,
// //   refreshToken,
// //   logout
// // };











// // server/controllers/auth.controller.js - Add this function

// // @desc    Create admin user (protected by secret key)
// // @route   POST /api/auth/create-admin
// // @access  Public (with secret key)
// // server/controllers/auth.controller.js
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const { validationResult } = require('express-validator');

// // Generate tokens
// const generateTokens = (userId) => {
//   const accessToken = jwt.sign(
//     { id: userId },
//     process.env.JWT_ACCESS_SECRET || 'access-secret-key-change-in-production',
//     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
//   );

//   const refreshToken = jwt.sign(
//     { id: userId },
//     process.env.JWT_REFRESH_SECRET || 'refresh-secret-key-change-in-production',
//     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
//   );

//   return { accessToken, refreshToken };
// };

// // @desc    Register regular user
// // @route   POST /api/auth/register
// const register = async (req, res) => {
//   try {
//     console.log('📝 Register attempt:', req.body.email);

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array()
//       });
//     }

//     const { name, email, password } = req.body;

//     // Check if user exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({
//         success: false,
//         message: 'User already exists'
//       });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: 'user' // Force user role
//     });

//     // Generate tokens
//     const { accessToken, refreshToken } = generateTokens(user._id);

//     // Save refresh token
//     user.refreshToken = refreshToken;
//     await user.save();

//     console.log('✅ User registered:', user.email);

//     res.status(201).json({
//       success: true,
//       data: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         accessToken,
//         refreshToken
//       }
//     });
//   } catch (error) {
//     console.error('❌ Registration error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error during registration'
//     });
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// const login = async (req, res) => {
//   try {
//     console.log('🔑 Login attempt:', req.body.email);

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array()
//       });
//     }

//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     // Check password
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid credentials'
//       });
//     }

//     // Generate tokens
//     const { accessToken, refreshToken } = generateTokens(user._id);

//     // Save refresh token
//     user.refreshToken = refreshToken;
//     await user.save();

//     console.log('✅ User logged in:', user.email, 'Role:', user.role);

//     res.json({
//       success: true,
//       data: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         accessToken,
//         refreshToken
//       }
//     });
//   } catch (error) {
//     console.error('❌ Login error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error during login'
//     });
//   }
// };

// // @desc    Create admin user
// // @route   POST /api/auth/create-admin
// const createAdmin = async (req, res) => {
//   try {
//     console.log('👑 Admin creation attempt:', req.body.email);

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array()
//       });
//     }

//     const { name, email, password, secretKey } = req.body;

//     // Verify secret key
//     const validSecretKey = process.env.ADMIN_SECRET_KEY || 'admin-secret-key-123';
//     if (secretKey !== validSecretKey) {
//       console.log('❌ Invalid secret key provided');
//       return res.status(403).json({
//         success: false,
//         message: 'Invalid secret key'
//       });
//     }

//     // Check if user exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({
//         success: false,
//         message: 'User already exists'
//       });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create admin user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: 'admin'
//     });

//     // Generate tokens
//     const { accessToken, refreshToken } = generateTokens(user._id);

//     // Save refresh token
//     user.refreshToken = refreshToken;
//     await user.save();

//     console.log('✅ Admin created successfully:', user.email);

//     res.status(201).json({
//       success: true,
//       data: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         accessToken,
//         refreshToken
//       }
//     });
//   } catch (error) {
//     console.error('❌ Admin creation error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error during admin creation'
//     });
//   }
// };


// const refreshToken = async (req, res) => {
//   try {
//     const { refreshToken: token } = req.body;

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Refresh token required'
//       });
//     }

//     // Verify refresh token
//     const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh-secret-key-change-in-production');

//     // Find user with this refresh token
//     const user = await User.findOne({ _id: decoded.id, refreshToken: token });
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid refresh token'
//       });
//     }

//     // Generate new tokens
//     const tokens = generateTokens(user._id);

//     // Update refresh token
//     user.refreshToken = tokens.refreshToken;
//     await user.save();

//     res.json({
//       success: true,
//       data: tokens
//     });
//   } catch (error) {
//     console.error('❌ Refresh token error:', error);
//     res.status(401).json({
//       success: false,
//       message: 'Invalid refresh token'
//     });
//   }
// };


// const logout = async (req, res) => {
//   try {
//     const { refreshToken: token } = req.body;

//     if (token) {
//       // Clear refresh token from database
//       await User.findOneAndUpdate(
//         { refreshToken: token },
//         { $unset: { refreshToken: 1 } }
//       );
//     }

//     res.json({
//       success: true,
//       message: 'Logged out successfully'
//     });
//   } catch (error) {
//     console.error('❌ Logout error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error during logout'
//     });
//   }
// };

// module.exports = {
//   register,
//   login,
//   refreshToken,
//   logout,
//   createAdmin
// };






// server/controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Generate tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_SECRET || 'access-secret-key-change-in-production',
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET || 'refresh-secret-key-change-in-production',
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
  );

  return { accessToken, refreshToken };
};

// @desc    Register regular user
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    console.log('📝 Register attempt:', req.body.email);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user' // Force user role
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    console.log('✅ User registered:', user.email);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    console.log('🔑 Login attempt:', req.body.email);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    console.log('✅ User logged in:', user.email, 'Role:', user.role);

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Create admin user
// @route   POST /api/auth/create-admin
const createAdmin = async (req, res) => {
  try {
    console.log('👑 Admin creation attempt:', req.body.email);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, password, secretKey } = req.body;

    // Verify secret key
    const validSecretKey = process.env.ADMIN_SECRET_KEY || 'admin-secret-key-123';
    if (secretKey !== validSecretKey) {
      return res.status(403).json({
        success: false,
        message: 'Invalid secret key'
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    console.log('✅ Admin created successfully:', user.email);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    console.error('❌ Admin creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during admin creation'
    });
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh-secret-key-change-in-production');

    // Find user with this refresh token
    const user = await User.findOne({ _id: decoded.id, refreshToken: token });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    // Generate new tokens
    const tokens = generateTokens(user._id);

    // Update refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.json({
      success: true,
      data: tokens
    });
  } catch (error) {
    console.error('❌ Refresh token error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
const logout = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    if (token) {
      // Clear refresh token from database
      await User.findOneAndUpdate(
        { refreshToken: token },
        { $unset: { refreshToken: 1 } }
      );
    }

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('❌ Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
};
module.exports = {
  register,
  login,
  createAdmin,
  refreshToken,
  logout
};