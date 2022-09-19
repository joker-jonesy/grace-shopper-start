const conn = require('./connection');
const { Sequelize } = conn;

const Order = conn.define('order',{
    isCart:{
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    orderStreet:{
        type: Sequelize.STRING,

    },
    orderCity:{
        type: Sequelize.STRING,
    },
    orderZip:{
        type: Sequelize.STRING,
    },
    orderState:{
        type: Sequelize.STRING,
    },
    orderCountry:{
        type: Sequelize.STRING,
    }
})

module.exports=Order;