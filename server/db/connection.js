const Sequelize = require('sequelize');

if (process.env.QUIET) {
	config.logging = false;
}

//you name this whatever your project is
const connection = new Sequelize(
	process.env.DATABASE_URL || 'postgres://localhost/lol-cards',{
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			}
		}
	},
);

module.exports = connection;
