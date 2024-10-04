// src/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {

  Uid: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4 
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
}, 
{  
  tableName: 'tbl_Users',
  timestamps: false
});

module.exports = User;