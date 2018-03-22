module.exports = {
  port: process.env.PORT || 3000,
  api: {
    clientUrl: process.env.API_CLIENT_URL || '',
    serverUrl:
      process.env.API_SERVER_URL ||
      `http://localhost:${process.env.PORT || 3000}`,
  },
  mongoDBUrl: 'mongodb://localhost:27017/api',
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'lol' },
  },
};
