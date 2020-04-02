import Post from '../models/Post';
import File from '../models/File';
import Like from '../models/Like';

import NotFoundException from '../exceptions/NotFoundException';

class PostService {
  async all() {
    const posts = await Post.findAll({
      order: ['id'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Like,
          as: 'likes',
          attributes: ['id'],
        },
      ],
    });
    return posts;
  }

  async countAll() {
    const length = await Post.count();
    return length;
  }

  async paginated(page, pageSize) {
    const posts = await Post.findAll({
      order: ['id'],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Like,
          as: 'likes',
          attributes: ['id'],
        },
      ],
    });
    return posts;
  }

  async find(id) {
    const post = await Post.findByPk(id, {
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Like,
          as: 'likes',
          attributes: ['id'],
        },
      ],
    });

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
    const { text, file_id } = data;

    const post = await Post.findByPk(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const newPost = await post.update({ text, file_id, edited: true });

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

  async like(post_id) {
    const like = await Like.create({ post_id: +post_id });

    return like;
  }
}

export default new PostService();
