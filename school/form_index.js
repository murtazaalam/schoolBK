const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const SchoolUser = require("./modals/schooluser");

const app = express();

app.use(bodyParser.json());

const MONGO_URI = "mongodb://localhost:27017/schoolDB";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/school-user", async (req, res) => {
  try {
    const { username, email, password, role, schoolName, activationDate, deactivationDate, logo, registrationNumber, address } = req.body;

    const schoolUser = new SchoolUser({
      username,
      email,
      password,
      role,
      schoolName,
      activationDate,
      deactivationDate,
      logo,
      registrationNumber,
      address,
    });

    const savedUser = await schoolUser.save();
    return res.status(201).json({ success: true, data: savedUser });
  } catch (error) {
    console.error("Error creating school user:", error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Duplicate field value entered." });
    }
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
});

