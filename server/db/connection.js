const Sequelize = require('sequelize');

const config = {};

if (process.env.QUIET) {
	config.logging = false;
}

//you name this whatever your project is
const connection = new Sequelize(
	process.env.DATABASE_URL || 'postgres://localhost/lolcards',
	config
);

module.exports = connection;
