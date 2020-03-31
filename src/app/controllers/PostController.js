import PostService from '../services/PostService';

class PostController {
  async index(req, res) {
    const posts = await PostService.all();

    return res.json({ success: true, data: posts });
  }

  async get(req, res) {
    const post = await PostService.find(req.params.id);

    return res.json({ success: true, data: post });
  }

  async post(req, res) {
    const post = await PostService.create(req.body);

    return res.json({ success: true, data: post });
  }

  async put(req, res) {
    const post = await PostService.update(req.params.id, req.body);

    return res.json({ success: true, data: post });
  }

  async delete(req, res) {
    const post = await PostService.delete(req.params.id);

    return res.json({ success: true, data: post });
  }
}

export default new PostController();
