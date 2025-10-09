const { PORT, CONNECTION_URL, JWT_SECT, EMAIL_USER, EMAIL_PASS } = process.env;

module.exports = {
  port: PORT,
  connectionurl: CONNECTION_URL,
  jwtsecret: JWT_SECT,
  email: EMAIL_USER,
  pass: EMAIL_PASS,
};
