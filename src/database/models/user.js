'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userId: DataTypes.STRING,
      PW: DataTypes.STRING,
      NAME: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Reservation, { foreignKey: { name: 'userId' } });
  };
  return User;
};
