const { PORT, CONNECTION_URL, JWT_SECT, EMAIL_USER, EMAIL_PASS } = process.env;

module.exports = {
  port: PORT,
  connectionurl:
    "mongodb+srv://nabinmahanty_db_user:Q%40werty00@cluster0.pe04ik3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  jwtsecret: JWT_SECT,
  email: EMAIL_USER,
  pass: EMAIL_PASS,
};
