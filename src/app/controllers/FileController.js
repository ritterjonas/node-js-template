import FileService from '../services/FileService';

class FileController {
  async store(req, res) {
    const file = await FileService.create(req.file);

    return res.json({
      success: true,
      data: {
        id: file.id,
        imageUrl: file.url,
      },
    });
  }
}

export default new FileController();
