'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Reservations',
      [
        {
          userId: 'eminem54',
          roomId: 1,
          start: '2019-10-20',
          finish: '2019-11-01'
        },
        {
          userId: 'eminem54',
          roomId: 3,
          start: '2019-10-22',
          finish: '2019-11-12'
        },
        {
          userId: 'eminem54',
          roomId: 4,
          start: '2019-10-25',
          finish: '2019-11-30'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reservations', null, {});
  }
};
