const https = require('https');
const API_KEY = 'AIzaSyCclEDHK8eJjYxiXWRPr5KKUul82cwpkac';
const URL = `https://firestore.googleapis.com/v1/projects/pg-contact/databases/(default)/documents/pg_contacts?key=${API_KEY}`;

https.get(URL, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.documents) {
        parsed.documents.forEach(doc => {
          const fields = doc.fields;
          const name = fields.name ? fields.name.stringValue : 'N/A';
          const phone = fields.phone ? fields.phone.stringValue : 'N/A';
          const phone2 = fields.phone2 ? fields.phone2.stringValue : '';
          const note = fields.note ? fields.note.stringValue : '';
          console.log(`[${name}] Phone: ${phone}, Phone2: ${phone2}, Note: ${note}`);
        });
      } else {
        console.log('No documents found or error:', parsed);
      }
    } catch (e) {
      console.log('Error parsing:', e.message);
    }
  });
}).on('error', err => {
  console.log('Request Error:', err.message);
});
