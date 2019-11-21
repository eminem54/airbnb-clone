'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kind: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      option1: {
        type: Sequelize.STRING
      },
      option2: {
        type: Sequelize.STRING
      },
      option3: {
        type: Sequelize.STRING
      },
      option4: {
        type: Sequelize.STRING
      },
      star: {
        type: Sequelize.FLOAT
      },
      imgurl: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      guest: {
        type: Sequelize.INTEGER
      },
      roomInfo1: {
        type: Sequelize.STRING
      },
      roomInfo2: {
        type: Sequelize.STRING
      },
      roomInfo3: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Rooms');
  }
};
