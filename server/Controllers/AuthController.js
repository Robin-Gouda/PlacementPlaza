import UserModule from "../Models/SignupSchema.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModule.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User With This Email Already exist",
        success: false,
      });
    }
    const userModel = new UserModule({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Signup Unsuccessful Internal Server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModule.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "User With This Email Don't exist",
        success: false,
      });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: "User With This Email Don't exist",
        success: false,
      });
    }
    res.status(200).json({
      message: "Login successful",
      success: true,
      email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Signup Unsuccessful Internal Server error",
      success: false,
    });
  }
};
