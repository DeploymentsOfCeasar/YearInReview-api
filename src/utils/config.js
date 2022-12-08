require('dotenv').config();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
const DEFAULT_ADMIN_USERNAME = process.env.DEFAULT_ADMIN_USERNAME;
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD;
const PASSWORD_SECRET_KEY = process.env.PASSWORD_SECRET_KEY;
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
// eslint-disable-next-line no-undef
const MONGODB_URI =
    process.env.NODE_ENV === 'test'
        ? // eslint-disable-next-line no-undef
          process.env.TEST_MONGODB_URI
        : // eslint-disable-next-line no-undef
          process.env.MONGODB_URI;

module.exports = {
    MONGODB_URI,
    PORT,
    DEFAULT_ADMIN_USERNAME,
    DEFAULT_ADMIN_PASSWORD,
    PASSWORD_SECRET_KEY,
    TOKEN_SECRET_KEY
};
