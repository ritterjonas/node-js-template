import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../../config/multer';

import FileController from '../controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/', upload.single('file'), FileController.store);

export default routes;
