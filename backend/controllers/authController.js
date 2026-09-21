import userModel from "../models/User.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utility/generateToken.js";
import { sendVerificationEmail } from "../utility/emailUpate.js";

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

    //token
    const verificationTok = await generateToken()

    //token expire
    const verificationTokExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000)

    //create user in db:
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken: verificationTok,
      verificationTokenExpiry: verificationTokExpiry
    });

    //send email:
    await sendVerificationEmail(email, verificationTok)


    //res
    return res.status(201).json(
      {
        message: "Signup successful! Please check your email to verify your account.",
      }
    )
    //create token:
    // const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    //   expiresIn: "7d",
    // });

    //send token response
    // res.status(201).json({
    //   token,
    //   user: {
    //     id: newUser._id,
    //     name: newUser.name,
    //     email: newUser.email,
    //   },
    // });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "something wen't wrong", error: err.message });
  }
};

//verify email 
export const verifyEmail = async (req, res) => {
  const { token } = req.body

  try {
    const user = await userModel.findOne({ verificationToken: token })
    if (!user) {
      return res.status(400).json({ message: "Invalid verification link" });
    }

    if (new Date() > user.verificationTokenExpiry) {
      return res.status(400).json({ message: "Verification link has expired" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();
    return res.status(200).json({ message: "Email verified successfully!" });
  }
  catch (err) {
    return res
      .status(500)
      .json({ message: "something wen't wrong", error: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find user's email in db
    const user = await userModel.findOne({ email }).select("+password");

    // validate email
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //validate user to be verified user
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in" });
    }

    //validate password
    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    //create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    //send token
    res.status(200).json({
      message: "Login successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something wen't wrong", error: err.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    })
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: "somthing wen't wrong", error: err.message })
  }
}