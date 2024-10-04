// src/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  idtbl_Users: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
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
  isadmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isactive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  
  tableName: 'tbl_Users',
  
});

module.exports = User;