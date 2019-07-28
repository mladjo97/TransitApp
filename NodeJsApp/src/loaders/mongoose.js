import mongoose from 'mongoose';
import config from '../config';

const loadMongoose = async () => {
  const connection = await mongoose.connect(config.databaseURL, { useNewUrlParser: true, useCreateIndex: true });
  return connection.connection.db;
};

export default loadMongoose;