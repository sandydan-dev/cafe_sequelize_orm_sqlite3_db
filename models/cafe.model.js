const { DataTypes, sequelize } = require("../lib/index");

const cafe = sequelize.define("cafe", {
  name: DataTypes.STRING,
  address: DataTypes.STRING,
  phoneNumber: DataTypes.STRING,
  openingHours: DataTypes.STRING,
  menu: DataTypes.STRING,
  specialties: DataTypes.STRING,
  foodType: DataTypes.STRING,
  priceRange: DataTypes.STRING,
  customerRating: DataTypes.FLOAT,
});

module.exports = cafe;
