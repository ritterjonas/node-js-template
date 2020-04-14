import 'dotenv/config';

import express from 'express';
import path from 'path';
import Youch from 'youch';
import 'express-async-errors';

import swaggerUi from 'swagger-ui-express';
import routes from './app/routes';
import specs from './swagger';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
  }

  routes() {
    this.server.use('/api', routes);
    this.server.use('/', swaggerUi.serve, swaggerUi.setup(specs));
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (err.status) {
        return res.status(err.status).json({ error: err.message });
      }

      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
