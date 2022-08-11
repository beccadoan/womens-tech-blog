const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../config/connection');

class Category extends Model {}

Category.init(
    {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      
      },
      
      post_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'post',
              key: 'id'
          }
      }
  },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'category'
    }
  );
  
  module.exports = Category;