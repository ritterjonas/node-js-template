import Post from '../models/Post';
import File from '../models/File';

import NotFoundException from '../exceptions/NotFoundException';

class PostService {
  async all() {
    const posts = await Post.findAll({
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return posts;
  }

  async find(id) {
    const post = await Post.findByPk(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async create(data) {
    const post = await Post.create(data);

    return post;
  }

  async update(id, data) {
    const { text } = data;

    const post = await Post.findByPk(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const newPost = await post.update({ text, edited: true });

    return newPost;
  }

  async delete(id) {
    const post = await Post.findByPk(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.destroy();

    return post;
  }
}

export default new PostService();
