import express from 'express';
import socketClient from './clients/socket.client';

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
    socketClient.sendUpdate({ id: 3, position: { lat: 2.44, lon: 4.55 }});
  } catch (err) {
    console.log(err);
  }

  return app;
};

const app = startServer();

export default app;