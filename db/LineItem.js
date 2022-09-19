const conn = require('./connection');
const { Sequelize } = conn;

const LineItem = conn.define('lineItem',{
    type: Sequelize.INTEGER,
    allowNull: false,
    default: 1,
})

module.exports = LineItem