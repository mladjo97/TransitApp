import config from '@config';
import mongoose from 'mongoose';

const loadMongoose = async () => {
  const connection = await mongoose.connect(config.databaseURL, { useNewUrlParser: true, useCreateIndex: true });
  return connection.connection.db;
};

export default loadMongoose;