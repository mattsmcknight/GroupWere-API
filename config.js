module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "3000",
  URL: process.env.BASE_URL || "http://10.0.0.20:3000",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/emails"
};
