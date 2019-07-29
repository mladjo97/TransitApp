import config from '@config';
import mongoose from 'mongoose';

const loadMongoose = async () => {
  console.log('Connecting to database URL: ' + config.databaseURL);
  const connection = await mongoose.connect(config.databaseURL, { useNewUrlParser: true, useCreateIndex: true });
  return connection.connection.db;
};

export default loadMongoose;