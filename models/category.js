'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Category.hasMany(models.Post);
      models.Category.hasMany(models.Article);
    }
  };
  Category.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    types: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};