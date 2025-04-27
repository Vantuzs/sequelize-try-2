'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:{
            tableName:'users',
            key: 'id'
          }
        }
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isDone: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_done'
      },
      deadline: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};