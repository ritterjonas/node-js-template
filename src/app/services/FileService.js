import File from '../models/File';

class FileService {
  async create(data) {
    const file = await File.create({
      name: data.originalname,
      path: data.filename,
    });

    return file;
  }
}

export default new FileService();
