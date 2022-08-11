const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Mailer extends Model {}

Mailer.init(
    {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'user',
              key: 'id'
          }
      } ,
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
      modelName: 'comment'
    }
  );