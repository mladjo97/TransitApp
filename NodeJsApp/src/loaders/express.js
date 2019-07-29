import bodyParser from 'body-parser';
import cors from 'cors';

import config from '@config';
import routes from '@api';

const loadExpressApp =  (app) => {
  
    // Health Check endpoint
    app.get('/status', (req, res) => {
        res.status(200).end();
    });

    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Load API routes & error handlers
    app.use(config.api.prefix, routes());    
};

export default loadExpressApp;