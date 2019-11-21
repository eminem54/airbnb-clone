'use strict';
const models = require('./index');
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define(
    'Reservation',
    {
      userId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
      start: DataTypes.DATE,
      finish: DataTypes.DATE
    },
    {}
  );
  Reservation.associate = function(models) {
    // Reservation.belongsTo(models.User, { foreignKey: 'userId' });
    // Reservation.belongsTo(models.Room, { foreignKey: 'id' });
  };
  return Reservation;
};
