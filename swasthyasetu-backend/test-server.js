// Simple test to check if server is running
const fetch = require('node-fetch');

async function testServer() {
  try {
    console.log('Testing server connection...');
    
    // Test basic connection
    const response = await fetch('http://localhost:5000/test');
    const data = await response.json();
    console.log('✅ Server is running:', data);
    
    // Test auth endpoint
    const authResponse = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@test.com', password: 'test' })
    });
    console.log('Auth endpoint status:', authResponse.status);
    
  } catch (error) {
    console.error('❌ Server test failed:', error.message);
  }
}

testServer();