import { Router } from 'express';

import PostController from '../controllers/PostController';

import validate from '../middlewares/ValidatorMiddleware';
import postValidator from '../validators/PostValidator';

const routes = new Router();

routes.get('/', PostController.index);
routes.post('/', validate(postValidator.store(), 'body'), PostController.store);

routes.put(
  '/:id',
  validate(postValidator.update(), 'body'),
  PostController.update
);

export default routes;
