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
    const route = "verify"
    await sendVerificationEmail(email, verificationTok, route)


    //res
    return res.status(201).json(
      {
        message: "Signup successful! Please check your email to verify your account.",
      }
    )
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
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: "Invalid verification link" });
    }

    if (new Date() > user.verificationTokenExpiry) {
      return res.status(400).json({ message: "Verification link has expired", expired: true });
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


//resend account verification email:
export const resendVerification = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });

    //  For Security Purpose: even if user doesn't exist 
    if (!user) {
      return res.status(200).json({
        message: "If an account exists, a verification email has been sent.",
      });
    }

    //if already verified
    if (user.isVerified) {
      return res
        .status(400)
        .json({ message: "This account is already verified. Please login." });
    }

    // generate new token
    const newToken = await generateToken()
    user.verificationToken = newToken;
    user.verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await user.save();

    await sendVerificationEmail(user.email, newToken, "verify");

    return res.status(200).json({
      message: "If an account exists, a verification email has been sent.",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

//login controller
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

//forgot password link:
export const forgotLink = async (req, res) => {
  const { email } = req.body
  //token
  const token = await generateToken()
  //token expiry
  const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000)
  try {
    const user = await userModel.findOne({ email })
    //if user not available
    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    user.passwordToken = token
    user.passwordTokenExpiry = tokenExpiry
    await user.save()

    await sendVerificationEmail(email, token)

    return res.status(200).json({ message: "Reset link sent to your email" });

  } catch (err) {
    return res.status(500).json({ message: "somthing wen't wrong", error: err.message })
  }
}

export const updatePassword = async (req, res) => {
  const { password, token } = req.body

  //if any of the one not found
  if (!password || !token) {
    return res.status(400).json({ message: "Password and token are required" });
  }


  try {
    const user = await userModel.findOne({ passwordToken: token })

    if (!user) {
      return res.status(404).json({ message: "Token not found" });
    }

    if (new Date() > user.passwordTokenExpiry) {
      return res.status(404).json({ message: "Token is expired" });
    }
    user.password = await bycrypt.hash(password, 10)
    user.passwordToken = undefined
    user.passwordTokenExpiry = undefined
    await user.save()

    return res.status(200).json({ message: "Password updated successfully" })
  } catch (err) {
    return res.status(500).json({ message: "Something wen't wrong", error: err.message })
  }
}