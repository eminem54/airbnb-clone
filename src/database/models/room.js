'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    'Room',
    {
      kind: DataTypes.STRING,
      title: DataTypes.STRING,
      option1: DataTypes.STRING,
      option2: DataTypes.STRING,
      option3: DataTypes.STRING,
      option4: DataTypes.STRING,
      star: DataTypes.FLOAT,
      imgurl: DataTypes.STRING,
      price: DataTypes.INTEGER,
      guest: DataTypes.INTEGER,
      roomInfo1: DataTypes.STRING,
      roomInfo2: DataTypes.STRING,
      roomInfo3: DataTypes.STRING
    },
    {}
  );
  Room.associate = function(models) {
    Room.hasMany(models.Reservation);
  };
  return Room;
};
