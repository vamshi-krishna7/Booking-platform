const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

require("dotenv").config();

const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.ACCESS_SECRET || "access_secret",
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id },
    process.env.REFRESH_SECRET || "refresh_secret",
    { expiresIn: "7d" }
  );
};

const signup = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refresh_token = generateRefreshToken(user);

    await user.update({ refresh_token });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { userId } = req.body;

    await User.update({ refresh_token: null }, { where: { id: userId } });

    res.clearCookie("refresh_token");
    res.json({ message: "User logged out successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging out", error: error.message });
  }
};

module.exports = { signup, login, logout };
