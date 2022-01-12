'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.Category, {
        foreignKey: {
          allowNull: false,
        }
      })
    }
  };
  Post.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    date_post: DataTypes.DATE,
    id_category: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};