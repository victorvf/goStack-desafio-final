'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'deliveries',
          'deliveryman_id',
          {
              type: Sequelize.INTEGER,
              references: {
                  model: 'deliverymans',
                  key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
              allowNull: false
          });
  },

  down: queryInterface => queryInterface.removeColumn('deliveries', 'deliveryman_id'),
};
