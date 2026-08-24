import userModel from "../models/User.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//signup function
export const signup = async (req, res) => {
  try {
    //destructure required values from request
    const { name, email, password } = req.body;

    //verifying email to be unique:
    const emailCheck = await userModel.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash password:
    const hashedPassword = await bycrypt.hash(password, 10);

    //create user in db:
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    //create token:
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //send token response
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "something wen't wrong", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find user's email in db
    const user = await userModel.findOne({ email });
    console.log(user);

    // validate email
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    //validate password
    const isMatch = bycrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    //create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //send token
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something wen't wrong", error: err.message });
  }
};
