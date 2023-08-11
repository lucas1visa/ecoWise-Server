const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Cart',{
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
      },
        quantityAvailable: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          }
},{
timestamps: false,})};