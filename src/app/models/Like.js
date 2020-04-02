import Sequelize, { Model } from 'sequelize';

class Like extends Model {
  static init(sequelize) {
    super.init(
      {
        post_id: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Like;
