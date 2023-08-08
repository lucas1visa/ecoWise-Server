const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Cart',{
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
      },
        quantityAvailable: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          }
},{
timestamps: false,})};