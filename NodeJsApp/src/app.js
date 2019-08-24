import express from 'express';
import loader from '@loaders';
import config from '@config';
import socketLoader from './loaders/socket';

const startServer = () => {
  const app = express();
  loader({ expressApp: app });

  const server = app.listen(config.port, err => {
    if (err) {
      process.exit(1);
      return;
    }
  });

  socketLoader(server);   // requires http server

  return server;
};

const server = startServer();

export default server;