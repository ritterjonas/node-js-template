import Post from '../models/Post';
import File from '../models/File';

class PostController {
  async index(req, res) {
    const posts = await Post.findAll({
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json({ success: true, data: posts });
  }

  async store(req, res) {
    const post = await Post.create(req.body);

    return res.json({ success: true, data: post });
  }

  async update(req, res) {
    const { text } = req.body;

    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newPost = await post.update({ text, edited: true });

    return res.json(newPost);
  }
}

export default new PostController();
