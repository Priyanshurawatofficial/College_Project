require('dotenv').config();
const { cloudinary } = require('./config/cloudinary');

// Test Cloudinary connection
async function testCloudinary() {
  try {
    console.log('Testing Cloudinary connection...');
    console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
    console.log('API Key:', process.env.CLOUDINARY_API_KEY);
    
    // Test connection by getting account details
    const result = await cloudinary.api.usage();
    console.log('✅ Cloudinary connection successful!');
    console.log('Account usage:', result);
    
  } catch (error) {
    console.error('❌ Cloudinary connection failed:', error.message);
  }
}

testCloudinary();
