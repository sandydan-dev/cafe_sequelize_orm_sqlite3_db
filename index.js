const express = require("express");
const app = express();
const port = 3000;
const { Op } = require("sequelize");
const cafe = require("./models/cafe.model");
const { sequelize } = require("./lib/index");

// cafe data
const indianRestaurants = [
  {
    name: "Dosa Corner",
    address: "123 Desi Street, Mumbai",
    phoneNumber: "+91 9876543210",
    openingHours: "11 AM - 11 PM",
    menu: "South Indian cuisine",
    specialties: "Masala dosa, Idli sambar",
    foodType: "Vegetarian",
    priceRange: "$$",
    customerRating: 4.5,
  },
  {
    name: "Biryani Bazaar",
    address: "456 Mughal Lane, Delhi",
    phoneNumber: "+91 9012345678",
    openingHours: "12 PM - 10 PM",
    menu: "Hyderabadi biryani",
    specialties: "Chicken biryani, Veg biryani",
    foodType: "Non-Vegetarian",
    priceRange: "$$$",
    customerRating: 4.7,
  },
  {
    name: "Chaat Chaat",
    address: "789 Street Food St, Kolkata",
    phoneNumber: "+91 1112223333",
    openingHours: "10 AM - 10 PM",
    menu: "Indian street food",
    specialties: "Pani puri, Bhel puri",
    foodType: "Vegetarian",
    priceRange: "$",
    customerRating: 4.3,
  },
  {
    name: "Tandoori Nights",
    address: "321 Clay Oven Court, Chennai",
    phoneNumber: "+91 5556667777",
    openingHours: "7 PM - 11 PM",
    menu: "North Indian cuisine",
    specialties: "Chicken tikka masala, Naan bread",
    foodType: "Non-Vegetarian",
    priceRange: "$$$",
    customerRating: 4.8,
  },
  {
    name: "Vada Pav Paradise",
    address: "456 Mumbai Street Food, Mumbai",
    phoneNumber: "+91 8889990000",
    openingHours: "9 AM - 9 PM",
    menu: "Vegetarian fast food",
    specialties: "Vada pav, Misal pav",
    foodType: "Vegetarian",
    priceRange: "$$",
    customerRating: 4.6,
  },
  {
    name: "Butter Chicken Bliss",
    address: "234 Punjabi Lane, Amritsar",
    phoneNumber: "+91 9998887777",
    openingHours: "12 PM - 10 PM",
    menu: "Punjabi cuisine",
    specialties: "Butter chicken, Sarson ka saag",
    foodType: "Non-Vegetarian",
    priceRange: "$$$",
    customerRating: 4.9,
  },
  {
    name: "Rajasthani Rajmahal",
    address: "567 Thali Palace, Jaipur",
    phoneNumber: "+91 1112223333",
    openingHours: "11 AM - 10 PM",
    menu: "Rajasthani thalis",
    specialties: "Dal bati churma, Laal maans",
    foodType: "Vegetarian",
    priceRange: "$$",
    customerRating: 4.7,
  },
  {
    name: "Hyderabadi Haleem House",
    address: "890 Old City Street, Hyderabad",
    phoneNumber: "+91 4445556666",
    openingHours: "10 AM - 9 PM",
    menu: "Hyderabadi cuisine",
    specialties: "Chicken haleem, Biryani",
    foodType: "Non-Vegetarian",
    priceRange: "$$$",
    customerRating: 4.8,
  },
  {
    name: "Punjabi Paratha Palace",
    address: "123 Tandoori Oven, Ludhiana",
    phoneNumber: "+91 8889990000",
    openingHours: "7 AM - 10 PM",
    menu: "North Indian breakfast dishes",
    specialties: "Parathas, Sarson ka saag",
    foodType: "Vegetarian",
    priceRange: "$$",
    customerRating: 4.6,
  },
  {
    name: "South Indian Sadhya",
    address: "456 Banana Leaf Lane, Kochi",
    phoneNumber: "+91 1112223333",
    openingHours: "9 AM - 9 PM",
    menu: "Traditional South Indian meals",
    specialties: "Sadhya, Idli sambar",
    foodType: "Vegetarian",
    priceRange: "$$",
    customerRating: 4.5,
  },
  {
    name: "Tamil Nadu Thali",
    address: "789 Chettinad Street, Madurai",
    phoneNumber: "+91 5556667777",
    openingHours: "11 AM - 10 PM",
    menu: "Chettinad cuisine",
    specialties: "Chicken chettinad, Varutharacha kozhi curry",
    foodType: "Non-Vegetarian",
    priceRange: "$$$",
    customerRating: 4.7,
  },
  {
    name: "Goan Fish Fry Fiesta",
    address: "321 Beachside Bistro, Goa",
    phoneNumber: "+91 4445556666",
    openingHours: "12 PM - 10 PM",
    menu: "Goan seafood dishes",
    specialties: "Fish fry, Prawns balchao",
    foodType: "Non-Vegetarian",
    priceRange: "$$$",
    customerRating: 4.8,
  },
  {
    name: "Uttarakhand Thukpa Trail",
    address: "456 Himalayan Highway, Dehradun",
    phoneNumber: "+91 8889990000",
    openingHours: "10 AM - 9 PM",
    menu: "Himalayan mountain food",
    specialties: "Thukpa, Makka ki roti",
    foodType: "Vegetarian",
    priceRange: "$$",
    customerRating: 4.6,
  },
  {
    name: "Maharashtrian Misal Magic",
    address: "789 Vada Pav Street, Pune",
    phoneNumber: "+91 5556667777",
    openingHours: "8 AM - 10 PM",
    menu: "Marathi street food",
    specialties: "Misal pav, Vada pav",
    foodType: "Vegetarian",
    priceRange: "$$",
    customerRating: 4.5,
  },
  {
    name: "Kerala Karimeen Curry Kitchen",
    address: "321 Backwater Bistro, Alleppey",
    phoneNumber: "+91 1112223333",
    openingHours: "11 AM - 9 PM",
    menu: "Malayali cuisine",
    specialties: "Karimeen fish curry, Appam with stew",
    foodType: "Non-Vegetarian",
    priceRange: "$$$",
    customerRating: 4.7,
  },
];

// seeding data
app.get("/seed_cafe_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await cafe.bulkCreate(indianRestaurants);
    res.status(200).send("Cafe data seeding successfull");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to seed data", error: error.message });
  }
});

// get all cafe details

async function fetchAllCafeDetails() {
  let query = await cafe.findAll();
  if (!query) {
    return "Data not found";
  } else {
    return { cafe: query };
  }
}

app.get("/cafe", async (req, res) => {
  //🟢
  try {
    let result = await fetchAllCafeDetails();
    // const cafes = await cafe.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get cafe details by id
async function fetchCafeDetailsById(id) {
  let query = await cafe.findByPk(id);
  if (!query) {
    return { cafe: null };
  } else {
    return { cafe: query };
  }
}
app.get("/cafe/details/:id", async (req, res) => {
  //🟢
  try {
    let id = parseInt(req.params.id);
    let result = await fetchCafeDetailsById(id);
    if (!result.cafe) {
      return res.status(404).json({ message: "Cafe not id found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// fetch cafe items by rating more than with give value
async function fetchCafeByRating(maxRating) {
  let query = await cafe.findAll({
    where: { customerRating: { [Op.gte]: maxRating } },
  });
  if (!query) {
    return null;
  } else {
    return { cafe: query };
  }
}
app.get("/cafe/rating/:rating", async (req, res) => {
  //🟢
  try {
    let maxRating = parseInt(req.params.rating);
    let result = await fetchCafeByRating(maxRating);
    if (result.cafe.length === 0) {
      return res.status(404).json({
        message: "No cafe found with rating more than the given value",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// fetch footype from database where food is vegitarian or non vegiterian
async function fetchCafeFoodByFoodType(foodType) {
  let query = await cafe.findAll({ where: { foodType: foodType } });

  if (!query) {
    return null;
  } else {
    return { cafe: query };
  }
}
app.get("/cafe/food", async (req, res) => {
  //🟢
  try {
    let foodType = req.query.foodType;
    let result = await fetchCafeFoodByFoodType(foodType);
    if (result.cafe.length === 0) {
      return res
        .status(404)
        .json({ message: `No cafe found with ${foodType} food` });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// sort all cafe items by name
async function fetchCateItemSortedByName() {
  let query = await cafe.findAll({ order: [["name"]] });
  if (!query) {
    return null;
  } else {
    return { cafe: query };
  }
}
app.get("/cafe/name", async (req, res) => {
  try {
    let result = await fetchCateItemSortedByName();
    if (result.cafe.length === 0) {
      return res.status(404).json({ message: "No cafe found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
