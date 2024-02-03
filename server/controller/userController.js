const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const authMiddleware = require("./../middleware/authMiddleware");
const jwt = require("jsonwebtoken");

// Route for user registration
router.post("/register", async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Check if passwords match
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hashedPassword,
      department: req.body.department,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Route for user login
router.post("/login", async (req, res) => {
  try {
    // Check if the user exists
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token with a 90-day expiration
    const expiresIn = 90 * 24 * 60 * 60; // 90 days in seconds
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn,
    });

    const logedinuser = await UserModel.findById(user._id).select("-password");
    // Send the token to the client
    res.status(200).json({ user: logedinuser, token, message: "Login successful" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/user", authMiddleware, async (req, res) => {
  try {
    // Access the authenticated user through req.user
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
