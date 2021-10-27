'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Article.belongsTo(models.Category, {
        foreignKey: {
          allowNull: false,
        }
      })
    }
  };
  Article.init({
    id: DataTypes.BIGINT,
    description: DataTypes.STRING,
    id_category: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};