import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validate input
    if (!username || !password || !role) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "Username already taken." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    return res.status(201).json({
      status: "success",
      message: "User registered successfully.",
      user: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Registration failed.",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields are required." });
    }

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    return res.status(200).json({
      status: "success",
      message: "Login successful.",
      user: { username: user.username, role: user.role },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Login failed.",
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
  try {
    // Invalidate token by informing the client to remove it from their storage
    return res.status(200).json({
      status: "success",
      message: "Logout successful.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "Logout failed.",
        error: error.message,
      });
  }
};
