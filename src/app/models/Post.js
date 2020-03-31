import Sequelize, { Model } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        text: Sequelize.STRING,
        edited: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.updated_at !== this.created_at;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'image' });
  }
}

export default Post;