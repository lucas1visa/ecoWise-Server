const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    address1: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
    address2: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
    number: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
    door: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
    city: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
    province: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
    postalCode: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    register:{
      type: DataTypes.STRING,
      defaultValue: "ecoWiseDB"
    }
  });
};
