import * as dotenv from 'dotenv';

const envFound = dotenv.config();
if (!envFound) {
    throw new Error("Couldn't find .env file");
}

export default {
    /**
     * Web API port 
     */
    port: parseInt(process.env.PORT, 10),

    /**
     * MongoDB connection string
     */
    databaseURL: process.env.MONGODB_URI,

    /**
     * API configurations
     */
    api: {
        prefix: '/api',
    },
};