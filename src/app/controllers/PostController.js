import PostService from '../services/PostService';

import format from '../utils/Formatter';

class PostController {
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

  async post(req, res) {
    await PostService.create(req.body);

    return res.json({ success: true });
  }

  async put(req, res) {
    await PostService.update(req.params.id, req.body);

    return res.json({ success: true });
  }

  async delete(req, res) {
    await PostService.delete(req.params.id);

    return res.json({ success: true });
  }

  async like(req, res) {
    const post_id = req.params.id;

    await PostService.find(post_id);
    await PostService.like(post_id);

    return res.json({ success: true });
  }
}

export default new PostController();
