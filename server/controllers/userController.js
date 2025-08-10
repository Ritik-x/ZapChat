//signup

import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async () => {
  const { email, fullName, password, profilePic, bio } = req.body;

  try {
    if (!email || !fullName || !password || !bio) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      fullName,
      hashedPassword,
      profilePic,
      bio,
    });
    // craete token for authenticate the user

    const token = generateToken(newUser._id);
    return res
      .status(200)
      .json({ success: true, message: "User created successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500, {
      success: false,
      message: "Internal server error",
    });
  }
};

// controller to login

export const login = async () => {
  try {
    const { email, password } = req.body;

    const userdata = await User.findOne({ email });
    const isPassword = await bcrypt.compare(password, userdata.password);
    if (!userdata || !isPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = generateToken(userdata._id);
    return res
      .status(200)
      .json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.log(error);
    return res.status(500, {
      success: false,
      message: "Internal server error",
    });
  }
};

// Wheather the user is authenticate or not

export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user, message: "User is authenticated" });
};

//  user can update their profile and images also we craerte a rthat controller

export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;

    const userId = req.user._id;
    let updateUser;

    if (!profilePic) {
      updateUser = await User.findByIdAndUpdate(
        userId,
        { fullName, bio },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      updateUser = await User.findByIdAndUpdate(
        userId,
        { fullName, bio, profilePic: upload.secure_url },
        { new: true }
      );
    }

    res.json({ success: true, updateUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
