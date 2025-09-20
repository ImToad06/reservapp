import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUserService,
  getUserByEmailService,
} from "../model/userModel.js";

export const register = async (req, res) => {
  try {
    const { name, lastName, birthdate, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createUserService(
      name,
      lastName,
      birthdate,
      email,
      hashedPassword,
      role,
    );
    res.status(201).json({
      message: "User registered succesfully",
      user: result,
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong ${error}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await getUserByEmailService(email);
    if (!result) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, result.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      {
        id: result.user_id,
        role: result.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong ${error}`,
    });
  }
};
