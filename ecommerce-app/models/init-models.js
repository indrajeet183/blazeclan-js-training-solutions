var DataTypes = require("sequelize").DataTypes;
var _address = require("./address");
var _category = require("./category");
var _category_products = require("./category_products");
var _customer = require("./customer");
var _login_history = require("./login_history");
var _manufacturer = require("./manufacturer");
var _order_items = require("./order_items");
var _orders = require("./orders");
var _payment = require("./payment");
var _payment_methods = require("./payment_methods");
var _products = require("./products");
var _role = require("./role");
var _role_users = require("./role_users");
var _shipment = require("./shipment");
var _shipment_items = require("./shipment_items");
var _shipment_orders = require("./shipment_orders");
var _shipping_methods = require("./shipping_methods");
var _sub_category = require("./sub_category");
var _users = require("./users");
var _vendor = require("./vendor");
var _vendor_products = require("./vendor_products");

function initModels(sequelize) {
  var address = _address(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var category_products = _category_products(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var login_history = _login_history(sequelize, DataTypes);
  var manufacturer = _manufacturer(sequelize, DataTypes);
  var order_items = _order_items(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var payment = _payment(sequelize, DataTypes);
  var payment_methods = _payment_methods(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var role_users = _role_users(sequelize, DataTypes);
  var shipment = _shipment(sequelize, DataTypes);
  var shipment_items = _shipment_items(sequelize, DataTypes);
  var shipment_orders = _shipment_orders(sequelize, DataTypes);
  var shipping_methods = _shipping_methods(sequelize, DataTypes);
  var sub_category = _sub_category(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var vendor = _vendor(sequelize, DataTypes);
  var vendor_products = _vendor_products(sequelize, DataTypes);

  manufacturer.belongsTo(address, { as: "address_address", foreignKey: "address" });
  address.hasMany(manufacturer, { as: "manufacturers", foreignKey: "address" });
  orders.belongsTo(address, { as: "shipping_address_address", foreignKey: "shipping_address" });
  address.hasMany(orders, { as: "orders", foreignKey: "shipping_address" });
  orders.belongsTo(address, { as: "billing_address_address", foreignKey: "billing_address" });
  address.hasMany(orders, { as: "billing_address_orders", foreignKey: "billing_address" });
  vendor.belongsTo(address, { as: "address_address", foreignKey: "address" });
  address.hasMany(vendor, { as: "vendors", foreignKey: "address" });
  category_products.belongsTo(category, { as: "category", foreignKey: "category_id" });
  category.hasMany(category_products, { as: "category_products", foreignKey: "category_id" });
  sub_category.belongsTo(category, { as: "parent", foreignKey: "parent_id" });
  category.hasMany(sub_category, { as: "sub_categories", foreignKey: "parent_id" });
  address.belongsTo(customer, { as: "customer", foreignKey: "customer_id" });
  customer.hasMany(address, { as: "addresses", foreignKey: "customer_id" });
  orders.belongsTo(customer, { as: "customer", foreignKey: "customer_id" });
  customer.hasMany(orders, { as: "orders", foreignKey: "customer_id" });
  order_items.belongsTo(orders, { as: "order", foreignKey: "order_id" });
  orders.hasMany(order_items, { as: "order_items", foreignKey: "order_id" });
  shipment_orders.belongsTo(orders, { as: "order", foreignKey: "order_id" });
  orders.hasMany(shipment_orders, { as: "shipment_orders", foreignKey: "order_id" });
  orders.belongsTo(payment, { as: "payment", foreignKey: "payment_id" });
  payment.hasMany(orders, { as: "orders", foreignKey: "payment_id" });
  payment.belongsTo(payment_methods, { as: "payment_method_payment_method", foreignKey: "payment_method" });
  payment_methods.hasMany(payment, { as: "payments", foreignKey: "payment_method" });
  category_products.belongsTo(products, { as: "product", foreignKey: "product_id" });
  products.hasMany(category_products, { as: "category_products", foreignKey: "product_id" });
  order_items.belongsTo(products, { as: "product", foreignKey: "product_id" });
  products.hasMany(order_items, { as: "order_items", foreignKey: "product_id" });
  shipment_items.belongsTo(products, { as: "item", foreignKey: "item_id" });
  products.hasMany(shipment_items, { as: "shipment_items", foreignKey: "item_id" });
  vendor_products.belongsTo(products, { as: "product", foreignKey: "product_id" });
  products.hasMany(vendor_products, { as: "vendor_products", foreignKey: "product_id" });
  role_users.belongsTo(role, { as: "role", foreignKey: "role_id" });
  role.hasMany(role_users, { as: "role_users", foreignKey: "role_id" });
  orders.belongsTo(shipment, { as: "shipment", foreignKey: "shipment_id" });
  shipment.hasMany(orders, { as: "orders", foreignKey: "shipment_id" });
  shipment_orders.belongsTo(shipment, { as: "shipment", foreignKey: "shipment_id" });
  shipment.hasMany(shipment_orders, { as: "shipment_orders", foreignKey: "shipment_id" });
  shipment_items.belongsTo(shipment_orders, { as: "shipment_order", foreignKey: "shipment_order_id" });
  shipment_orders.hasMany(shipment_items, { as: "shipment_items", foreignKey: "shipment_order_id" });
  shipment.belongsTo(shipping_methods, { as: "shipping_method_shipping_method", foreignKey: "shipping_method" });
  shipping_methods.hasMany(shipment, { as: "shipments", foreignKey: "shipping_method" });
  login_history.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(login_history, { as: "login_histories", foreignKey: "user_id" });
  role_users.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(role_users, { as: "role_users", foreignKey: "user_id" });
  vendor_products.belongsTo(vendor, { as: "vendor", foreignKey: "vendor_id" });
  vendor.hasMany(vendor_products, { as: "vendor_products", foreignKey: "vendor_id" });

  return {
    address,
    category,
    category_products,
    customer,
    login_history,
    manufacturer,
    order_items,
    orders,
    payment,
    payment_methods,
    products,
    role,
    role_users,
    shipment,
    shipment_items,
    shipment_orders,
    shipping_methods,
    sub_category,
    users,
    vendor,
    vendor_products,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
