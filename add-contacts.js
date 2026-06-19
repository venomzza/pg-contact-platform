// add-contacts.js — Firebase Firestore REST API se contacts add karo
const https = require('https');

const PROJECT_ID = 'pg-contact';
const API_KEY    = 'AIzaSyCclEDHK8eJjYxiXWRPr5KKUul82cwpkac';
const URL_BASE   = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/pg_contacts?key=${API_KEY}`;

// ── Contacts to Add ──────────────────────────────────────
const contacts = [
  {
    name:  'Topper PG',
    phone: '919810144901',
    phone2: '',
    note:  ''
  },
  {
    name:  'Lakshay Residency',
    phone: '919001073414',
    phone2: '919784070543',
    note:  ''
  },
  {
    name:  'Sarthak Old Sarthi',
    phone: '919450707295',
    phone2: '918946962167',
    note:  ''
  },
  {
    name:  'Sushila Tower Hostel',
    phone: '919314276190',
    phone2: '',
    note:  ''
  },
  {
    name:  "Lavanya's Hostel & PG",
    phone: '919606152181',
    phone2: '',
    note:  ''
  }
];

// ── Firestore REST API Helper ─────────────────────────────
function addContact(c) {
  return new Promise(function(resolve, reject) {
    const body = JSON.stringify({
      fields: {
        name:       { stringValue:    c.name },
        phone:      { stringValue:    c.phone },
        phone2:     { stringValue:    c.phone2 },
        note:       { stringValue:    c.note },
        contacted:  { booleanValue:   false },
        created_at: { timestampValue: new Date().toISOString() }
      }
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(URL_BASE, options, function(res) {
      let data = '';
      res.on('data', function(chunk) { data += chunk; });
      res.on('end', function() {
        if (res.statusCode === 200) {
          console.log('✅ Added:', c.name);
          resolve();
        } else {
          console.error('❌ Failed:', c.name, '|', res.statusCode, data);
          reject(new Error(data));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── Run sequentially ──────────────────────────────────────
(async function() {
  console.log('🔥 Firebase mein contacts add ho rahe hain...\n');
  for (const c of contacts) {
    await addContact(c);
    await new Promise(r => setTimeout(r, 300)); // small delay
  }
  console.log('\n🎉 Sab contacts add ho gaye! Site refresh karo.');
})();
