import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { addToBlacklist } from "../blacklist.js";

dotenv.config();

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password, role, phone_number, location_id } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    // Hash the password (not shown here for simplicity)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database (not shown here for simplicity)
    const userId = await User.createUser({
      name,
      email,
      password: hashedPassword,
      role,
      phone_number,
      location_id,
    });

    res.status(201).json({ message: "User registered successfully.", userId });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Use the User model to find the user by email
    const user = await User.findUserByEmail(email);

    // If user not found or password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Error logging in user" });
  }
};

// Logout route to invalidate the token
export const logoutUser = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  // Add token to blacklist
  addToBlacklist(token);
  res.json({ message: "User logged out successfully" });
};

export const addItemToFavourite = async (req, res) => {
  const { uid, iid } = req.params; // Get user ID and item ID from URL parameters

  try {
    // Check if the item is already in the user's favorites
    const existing = await User.checkExisting(uid, iid);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Item is already in favorites" });
    }
    // Insert the item into the user's favorites
    User.addItemTofav(uid, iid);

    res.status(201).json({ message: "Item added to favorites successfully" });
  } catch (error) {
    console.error("Error adding item to favorites:", error);
    res.status(500).json({ message: "Error adding item to favorites" });
  }
};
