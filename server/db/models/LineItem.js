const conn = require('../connection');
const { Sequelize } = conn;

const LineItem = conn.define('lineItem', {
	quantity:{type: Sequelize.INTEGER,
	allowNull: false,
	defaultValue: 1}
});

module.exports = LineItem;
