const conn = require('../connection');
const { Sequelize } = conn;

const LineItem = conn.define('lineItem', {
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 1,

		// set(value) {
		// 	value > 10 && this.getDataValue(`quantity`, 10);
		// },
	},
});

module.exports = LineItem;
