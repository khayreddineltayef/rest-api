const express = require("express");
const connect = require("./config/connectDB");
const User = require("./models/User");
require("dotenv").config({ path: "./config/.env" });

const app = express();
app.use(express.json());

connect();
app.post("/add", async (req, res) => {
  const { fullName, email, phone } = req.body;
  try {
    const newUser = new User({
      fullName,
      email,
      phone,
    });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
});
app.get("/get", async (req, res) => {
  try {
    const allPerson = await User.find();
    res.send(allPerson);
  } catch (error) {
    console.log(error);
  }
});
app.get("/get/:id", async (req, res) => {
  try {
    const specificPerson = await User.findById(req.params.id);
    res.send(specificPerson);
  } catch (error) {
    console.log(error);
  }
});
app.put("/update/:id", async (req, res) => {
  try {
    const updatePerson = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    res.send(updatePerson);
  } catch (error) {
    console.log(error);
  }
});
app.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("user is deleted");
  } catch (error) {
    console.log(error);
  }
});
PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err
    ? console.error(err)
    : console.log(`server  is running in the port ${PORT}`)
);
