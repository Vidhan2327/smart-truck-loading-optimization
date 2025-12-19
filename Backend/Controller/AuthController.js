const jsonwebtoken = require("jsonwebtoken");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");

exports.Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    if (role !== "Warehouse" && role !== "Dealer") {
      return res
        .status(400)
        .json({ message: "Role must be either 'Warehouse' or 'Dealer'" });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const pass = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: pass,
      role: role,
    });
    const token = jsonwebtoken.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const userf = await User.findOne({ email });
    if (!userf) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const decode = await bcrypt.compare(password, userf.password);
    if (!decode) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jsonwebtoken.sign(
      {
        userId: userf.id,
        role: userf.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User logged in successfully",
        user: {
          id: userf.id,
          name: userf.name,
          email: userf.email,
          role: userf.role,
        },
      });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.Logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ message: "User logged out" });
};
