import * as dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
    throw new Error('Could not find .env file.');
}

export default {
    /**
     * Web API port 
     */
    port: parseInt(process.env.PORT, 10),

    /**
     * MongoDB connection string - testdb for unit tests
     */
    databaseURL: process.env.NODE_ENV.trim() === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI,

    /**
     * API configurations
     */
    api: {
        prefix: '/api'
    },

    /**
     * Default date format
     */
    dateFormat: 'DD/MM/YYYY',

    /**
     *  JSON Web Token (JWT) secret
     */
    jwtSecret: process.env.JWT_SECRET,

    /**
     *  Email service API Key & email address
     */
    emailApiKey: process.env.EMAIL_API_KEY,
    email: 'tickets@transit.com',

    /**
     *  PayPal client id and secret
     */
    payPalClientId: process.env.PAYPAL_CLIENT_ID,
    payPalClientSecret: process.env.PAYPAL_CLIENT_SECRET
};