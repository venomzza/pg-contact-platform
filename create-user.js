const https = require('https');

const API_KEY = 'AIzaSyCclEDHK8eJjYxiXWRPr5KKUul82cwpkac';
const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

const payload = JSON.stringify({
  email: 'venomz@pgdirectory.com',
  password: 'pgdirectory',
  returnSecureToken: true
});

const req = https.request(URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
  });
});

req.on('error', console.error);
req.write(payload);
req.end();
