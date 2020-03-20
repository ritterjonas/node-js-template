import { Router } from 'express';
import posts from './posts';
import files from './files';

export default Router()
  .use('/posts', posts)
  .use('/files', files);
