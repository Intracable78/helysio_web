'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /*models.Account.belongsTo(models.Rank, {
        foreignKey: {
          allowNull: false,
        }
      })*/

    }
  };
  Account.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
      
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    id_rank: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};

