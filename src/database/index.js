import Sequelize from 'sequelize';

import Post from '../app/models/Post';
import File from '../app/models/File';
import Like from '../app/models/Like';

import databaseConfig from '../config/database';

const models = [Post, File, Like];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
