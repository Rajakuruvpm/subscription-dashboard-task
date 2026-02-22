// diagnose-auth.js
const fs = require('fs');
const path = require('path');

console.log('🔍 AUTHENTICATION SYSTEM DIAGNOSTIC');
console.log('='.repeat(60));

// Check current directory
console.log(`📁 Current directory: ${__dirname}`);

// Check if controller file exists
const controllerPath = path.join(__dirname, 'controllers', 'auth.controller.js');
console.log(`\n📄 Checking controller: ${controllerPath}`);

if (fs.existsSync(controllerPath)) {
  console.log('✅ Controller file exists');
  
  // Read file content
  const content = fs.readFileSync(controllerPath, 'utf8');
  console.log(`📏 File size: ${content.length} bytes`);
  
  // Check for module.exports
  if (content.includes('module.exports')) {
    console.log('✅ Found module.exports');
  } else {
    console.log('❌ No module.exports found');
  }
  
  // Check for each function
  const functions = ['register', 'login', 'refreshToken', 'logout'];
  functions.forEach(fn => {
    if (content.includes(`const ${fn} =`) || content.includes(`function ${fn}`)) {
      console.log(`  ✅ Found function: ${fn}`);
    } else {
      console.log(`  ❌ Missing function: ${fn}`);
    }
  });
  
  // Try to require the controller
  console.log('\n🔄 Attempting to load controller...');
  try {
    const controller = require(controllerPath);
    console.log('✅ Controller loaded successfully');
    console.log('📦 Exported keys:', Object.keys(controller));
    
    // Check each exported function
    functions.forEach(fn => {
      if (typeof controller[fn] === 'function') {
        console.log(`  ✅ ${fn}: function`);
      } else {
        console.log(`  ❌ ${fn}: ${typeof controller[fn]} - NOT A FUNCTION!`);
      }
    });
  } catch (error) {
    console.log('❌ Failed to load controller:', error.message);
  }
} else {
  console.log('❌ Controller file does NOT exist!');
}

// Check route file
const routePath = path.join(__dirname, 'routes', 'auth.routes.js');
console.log(`\n📄 Checking route: ${routePath}`);

if (fs.existsSync(routePath)) {
  console.log('✅ Route file exists');
  
  // Try to require the route
  console.log('\n🔄 Attempting to load route...');
  try {
    const route = require(routePath);
    console.log('✅ Route loaded successfully');
    console.log('📦 Route type:', typeof route);
  } catch (error) {
    console.log('❌ Failed to load route:', error.message);
  }
} else {
  console.log('❌ Route file does NOT exist!');
}

console.log('\n' + '='.repeat(60));