import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
import express from 'express';

import config from '@config';
import routes from '@api';

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

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
    app.use(multer({ storage: fileStorage }).single('image'));

    // Serve images to users
    app.use('/public/images', express.static('public/images'));

    // Load API routes & error handlers
    app.use(config.api.prefix, routes());    
};

export default loadExpressApp;