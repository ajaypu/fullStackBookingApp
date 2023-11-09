const User = require("../models/User");

const addUser = async (req, res, next) => {
  try {
    if (!req.body.number) {
      throw new Error("Phone number is mandatory");
    }
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.number;

    const data = await User.create({
      name: name,
      email: email,
      phonenumber: phonenumber,
    });
    res.status(201).json({ newUserDetail: data });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getUser = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ allUsers: users });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.params.id === "undefined") {
      return res.status(400).json({ err: "Id is missing" });
    }
    const uId = req.params.id;
    await User.destroy({ where: { id: uId } });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addUser,
  getUser,
  deleteUser,
};
