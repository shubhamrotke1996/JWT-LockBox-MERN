const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

// create validation middleware
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (user) {
      return res.status(409).json({
        message: "user is already exits",
        success: false,       
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userModel = new UserModel({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await userModel.save();

    return res.status(201).json({
      message: "User register successfully !",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isValidatePassword = await bcrypt.compare(password, user.password);
    if (!isValidatePassword) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    // generate jwt token

    const payload = { _id: user._id, email: user.email };

    const token = jwt.sign(payload, process.env.SECRETE_KEY, {
      expiresIn: "5h",
    });

    return res.status(200).json({
      message: "Login successfully",
      success: true,
      token: token,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = { signup, login };
