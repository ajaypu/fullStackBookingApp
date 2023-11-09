// const mysql = require("mysql2");
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-js", // database=> Schemas
//   password: "Ajay123sql",
// });

// module.exports = pool.promise();

/// Sequelize
const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-js", "root", "Ajay123sql", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
