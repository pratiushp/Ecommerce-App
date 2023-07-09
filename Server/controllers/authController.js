import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, phone, address, answer, email, password } = req.body;
    //validation
    if (!name) {
      return res.send({ message: "Fill Up the name" });
    }
    if (!email) {
      return res.send({ messa: "Fill Up the Email" });
    }
    if (!password) {
      return res.send({ message: "Fill Up the password" });
    }
    if (!phone) {
      return res.send({ message: "Fill Up the phone number" });
    }
    if (!address) {
      return res.send({ message: "Fill Up the address" });
    }
    if (!answer) {
      return res.send({ message: "Fill Up the Answer" });
    }

    //....
    //Check  User
    const existingUser = await userModel.findOne({ email });
    //Check Existing User
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User Already Registered",
      });
    }
    //register User
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,

      phone,
      address,
      answer,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Registration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validation

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //Check user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not found",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    //Token

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login Error",
      error,
    });
  }
};

//Forgot Password

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer  is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }

    //Check
    const user = await userModel.findOne({ email, answer });
    //Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }

    //Hashing the new password
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
      error,
    });
  }
};

//Test controller
export const testController = () => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

//Update Prodile
export const updateProfileController = async (req, res) => {
  try {
    const { name, phone, address, email, password } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and must be more than 6 character",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        phone: phone || user.phone,
        address: address || user.address,
        email: email || user.email,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Updating Profile",
      error,
    });
  }
};

//Order get
export const getOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Getting orders",
      error,
    });
  }
};
