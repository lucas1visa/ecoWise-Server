const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Purchase', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    payment_id: {
      type: DataTypes.INTEGER,
    },
    payment_type: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    total: {
      type: DataTypes.INTEGER,
    },
  },{
    timestamps: false,});
};
