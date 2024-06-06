import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "your_project_id",
    "private_key_id": "your_private_key_id",
    "private_key": "your_private_key".replace(/\\n/g, '\n'),
    "client_email": "your_client_email",
    "client_id": "your_client_id",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "your_client_x509_cert_url"
  })
});

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default auth;
