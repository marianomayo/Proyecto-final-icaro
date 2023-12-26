const { Sequelize } = require("sequelize");

const db = new Sequelize({
  host: "localhost",
  port: "3306",
  database: "teachecommerce",
  username: "root",
  password: "m38670883",
  dialect: "mysql",
});

module.exports = db;
