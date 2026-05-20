import User from "../models/user.js";
import bcrypt from "bcryptjs";

// get all user
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users: users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// get user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// create user
export const createUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const { name, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password: hashedPassword, role },
      { new: true },
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};
