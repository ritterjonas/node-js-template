import { Router } from 'express';

import PostController from '../controllers/PostController';

import validate from '../middlewares/ValidatorMiddleware';
import postValidator from '../validators/PostValidator';

export default Router()
  .get('/', PostController.index)
  .get('/:id', PostController.get)
  .post('/', validate(postValidator.store(), 'body'), PostController.post)
  .put('/:id', validate(postValidator.update(), 'body'), PostController.put)
  .delete('/:id', PostController.delete)
  .post('/:id/likes', PostController.like);
