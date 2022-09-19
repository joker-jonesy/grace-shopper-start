const conn = require('./conn');
const { Sequelize } = conn;

const Tag = conn.define('tag', {
    name:{

    }
})

module.exports=Tag