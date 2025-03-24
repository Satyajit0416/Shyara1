const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'shyara-fc8f6',
});

async function setFirestoreRules() {
  try {
    const rules = `
      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          match /{document=**} {
            allow read, write: if true;
          }
        }
      }
    `;

    await admin.securityRules().release({
      name: 'projects/shyara-fc8f6/rulesets/firestore',
      rules: {
        source: rules,
      },
    });

    console.log('Firestore rules updated successfully!');
  } catch (error) {
    console.error('Error setting rules:', error);
  }
}

setFirestoreRules();