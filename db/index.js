const conn = require('./connection');
const { Sequelize } = conn;
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Tag = require('./Tag');
const LineItem = require('./LineItem')

User.hasMany(Order);
Tag.hasMany(Product);
LineItem.belongsTo(Product)
Order.belongsTo(User);
Order.hasMany(LineItem)


module.exports = {
    conn,
    User,
    Tag,
    Order,
    LineItem,
    Product
};
