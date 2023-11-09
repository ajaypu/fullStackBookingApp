const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
// DATABASE
// const db = require("./util/database");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/User");
var cors = require("cors");
const app = express();

app.use(cors());

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/user");
// const { e rror } = require("console");

// // DB
// db.execute("SELECT * FROM products")
//   .then((result) => {
//     console.log(result[0], result[1]);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
app.use(bodyParser.json({ extended: false }));

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use("/user", userRoutes);

app.use(errorController.get404);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

//
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// //It sync your model to the database
// sequelize
//   // .sync({ force: true })
//   .sync({ force: true })
//   .then((result) => {
//     return User.findById(1);
//     // console.log(result);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({ name: "Max", email: "test@test.com" });
//     }
//     return user;
//   })
//   .then((user) => {
//     console.log(user);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
