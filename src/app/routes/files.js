import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../../config/multer';

import FileController from '../controllers/FileController';
import validate from '../middlewares/ValidatorMiddleware';
import fileValidator from '../validators/FileValidator';

const routes = new Router();
const upload = multer(multerConfig);

routes.post(
  '/',
  upload.single('file'),
  validate(fileValidator.store(), 'file'),
  FileController.store
);

export default routes;
