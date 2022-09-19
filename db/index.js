const conn = require('./conn');
const { Sequelize } = conn;
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Tag = require('./Tag');
//what are the models for an ecommerce website?
//users products orders tag

User.hasMany(Order);
Tag.hasMany(Product);
Order.belongsTo(User);
Order.hasMany(Product);




module.exports = {
    conn
};
