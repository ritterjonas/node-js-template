import PostService from '../services/PostService';

import format from '../utils/Formatter';

class PostController {
  /**
   * @swagger
   * path:
   *  /api/posts:
   *    get:
   *      summary: Get all posts
   *      tags:
   *        - Posts
   *      parameters:
   *      - name: page
   *        in:  query
   *        required: false
   *        type: int
   *      - name: pageSize
   *        in:  query
   *        required: false
   *        type: int
   *      responses:
   *        200:
   *          description: List of posts
   */
  async index(req, res) {
    const { page, pageSize } = req.query;

    if (page && pageSize) {
      const posts = await PostService.paginated(page, pageSize);
      const count = await PostService.countAll();

      const response = {
        success: true,
        currentPage: +page,
        pageSize: +pageSize,
        total: count,
        data: format(posts, [
          'id',
          'text',
          ['likesCount', 'likes'],
          ['image.url', 'imageUrl'],
          'edited',
          'createdAt',
        ]),
      };
      return res.json(response);
    }

    const posts = await PostService.all();
    const response = {
      success: true,
      data: format(posts, [
        'id',
        'text',
        ['likesCount', 'likes'],
        ['image.url', 'imageUrl'],
        'edited',
        'createdAt',
      ]),
    };

    return res.json(response);
  }

  /**
   * @swagger
   * path:
   *  /api/posts/{post_id}:
   *    get:
   *      summary: Get a post by id
   *      tags:
   *        - Posts
   *      parameters:
   *      - name: post_id
   *        in: path
   *        required: true
   *        type: integer
   *      responses:
   *        200:
   *          description: Post Details
   */
  async get(req, res) {
    const post = await PostService.find(req.params.id);
    const response = {
      success: true,
      data: format(post, [
        'id',
        'text',
        ['likesCount', 'likes'],
        ['image.url', 'imageUrl'],
        'edited',
        'createdAt',
      ]),
    };
    return res.json(response);
  }

  /**
   * @swagger
   * path:
   *  /api/posts:
   *    post:
   *      summary: Create a new post
   *      tags:
   *        - Posts
   *      parameters:
   *      - name: post
   *        in: body
   *        schema:
   *          type: object
   *          required:
   *            - text
   *          properties:
   *            text:
   *              type: string
   *            file_id:
   *              type: integer
   *      responses:
   *        200:
   *          description: Success
   */
  async post(req, res) {
    await PostService.create(req.body);

    return res.json({ success: true });
  }

  /**
   * @swagger
   * path:
   *  /api/posts/{post_id}:
   *    put:
   *      summary: Update post
   *      tags:
   *        - Posts
   *      parameters:
   *      - name: post_id
   *        in: path
   *        required: true
   *        type: integer
   *      - name: post
   *        in: body
   *        schema:
   *          type: object
   *          required:
   *            - text
   *          properties:
   *            text:
   *              type: string
   *            file_id:
   *              type: integer
   *      responses:
   *        200:
   *          description: Success
   */
  async put(req, res) {
    await PostService.update(req.params.id, req.body);

    return res.json({ success: true });
  }

  /**
   * @swagger
   * path:
   *  /api/posts/{post_id}:
   *    put:
   *      summary: Delete post
   *      tags:
   *        - Posts
   *      parameters:
   *      - name: post_id
   *        in: path
   *        required: true
   *        type: integer
   *      responses:
   *        200:
   *          description: Success
   */
  async delete(req, res) {
    await PostService.delete(req.params.id);

    return res.json({ success: true });
  }

  /**
   * @swagger
   * path:
   *  /api/posts/{post_id}/likes:
   *    post:
   *      summary: Add like
   *      tags:
   *        - Posts
   *      parameters:
   *      - name: post_id
   *        in: path
   *        required: true
   *        type: integer
   *      responses:
   *        200:
   *          description: Success
   */
  async like(req, res) {
    const post_id = req.params.id;

    await PostService.find(post_id);
    await PostService.like(post_id);

    return res.json({ success: true });
  }
}

export default new PostController();
