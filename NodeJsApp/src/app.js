import express from 'express';
import loader from '@loaders';
import config from '@config';

const startServer = () => {
    const app = express();
    loader({ expressApp: app});

    app.listen(config.port, err => {
        if (err) {
          process.exit(1);
          return;
        }        
      });
}

startServer();