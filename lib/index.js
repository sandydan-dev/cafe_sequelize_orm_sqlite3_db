const sq = require("sequelize");

const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./cafe_dishesh_database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
