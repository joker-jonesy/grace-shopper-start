const conn = require('./connection');
const { Sequelize } = conn;

const Tag = conn.define('tag', {
    name:{
        type:Sequelize.STRING,
    }
})

module.exports=Tag