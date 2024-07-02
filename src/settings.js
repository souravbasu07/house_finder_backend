export default {
  'port': process.env.PORT || 4000,
  'origin': [
    'http://localhost:5173',
    '*'
  ],
  'useHTTP2': false,
  'SMTP_HOST': 'sandbox.smtp.mailtrap.io',
  'SMTP_PORT': 2525,
  'SMTP_USER': '954c1a14c133f0',
  'SMTP_PASSWORD': 'd2fa43c75c2c0b',
  'EMAIL_NAME': 'House Finder',
  'EMAIL_FROM': 'from@example.com',
  'MONGODB_URL': 'mongodb+srv://sourov07coredevs:sourov07admin@cluster0.yaid3en.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  secret: 'de795eb5a98669ef111196b68c38d974516db04e063a7cb8f54ea3661a70106c',
  tokenKey: 'token'
};