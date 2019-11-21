const models = require('../database/models/index');

const getUsers = async () => {
  const users = await models.User.findAll();
  return users;
};

const getUser = async id => {
  const user = await models.User.findOne({ where: { userId: id } });
  return user;
};

const getUserAndReservation = async id => {
  models.User.findAll().then(result => {
    models.User.findOne({
      include: {
        model: models.Reservation,
        where: { userId: id }
      }
    }).then(result2 => {
      console.log(result2.replies);
    });
  });
};
module.exports = {
  getUser,
  getUsers
};
