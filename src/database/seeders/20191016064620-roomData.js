'use strict';
const jsonData = require('../data.json');

jsonData.forEach(v => {
  v.option.forEach((x, i) => {
    let key = 'option' + (i + 1);
    v[key] = x;
  });
  v.roomInfo.forEach((x, i) => {
    let key = 'roomInfo' + (i + 1);
    v[key] = x;
  });
  delete v.option;
  delete v.roomInfo;
});
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rooms', jsonData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rooms', null, {});
  }
};
