'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [queryInterface.addColumn('users', 'userName', Sequelize.STRING, {
      allowNull: true
    })];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn('users', 'userName')];
  }
};
