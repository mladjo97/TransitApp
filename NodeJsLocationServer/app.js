import express from 'express';
import positionDispatcher from './dispatchers/position.dispatcher';

const startServer = async () => {
  const app = express();

  app.listen(3000, err => {
    if (err) {
      process.exit(1);
      return;
    }
  });

  console.log('Started the location server.');

  try {
    positionDispatcher.doWork();
  } catch (err) {
    console.log(err);
  }

  return app;
};

const app = startServer();

export default app;