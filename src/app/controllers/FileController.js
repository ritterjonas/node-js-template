import FileService from '../services/FileService';

class FileController {
  /**
   * @swagger
   * path:
   *  /api/files:
   *    post:
   *      summary: Upload image
   *      tags:
   *        - Files
   *      consumes:
   *        - multipart/form-data
   *      parameters:
   *      - name: file
   *        in: formData
   *        required: true
   *        type: file
   *      responses:
   *        200:
   *          description: Success
   */
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
