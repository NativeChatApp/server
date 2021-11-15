import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import { generateToken } from "../services/utils.js";

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email }).lean();
    if (!user) return res.send({ code: 404, msg: "No user found" });
    if (bcrypt.compare(password, user.password)) {
      let token = await generateToken(user._id);
      delete user["password"];
      if (token) {
        return res.send({
          code: 200,
          token,
          user,
        });
      } else {
        return res.send({ code: 303, msg: "Some Error Occured" });
      }
    } else {
      return res.send({ code: 404, msg: "Wrong email or password" });
    }
  } catch (error) {
    console.log("Error in LoginController =>", error);
    res.send({ code: 500, msg: "Internal Server Error" });
  }
};

export const RegisterController = async (req, res) => {
  try {
    const { name, email, dateOfBirth, password, confirmPassword } = req.body;
    if (
      password !== confirmPassword ||
      password === "" ||
      confirmPassword === ""
    )
      return res.send({ code: 303, msg: "Password must match, required" });
    const isUser = await userModel.findOne({ email });
    if (isUser) return res.send({ code: 404, msg: "Email Already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newuser = await userModel.create({
      name,
      email,
      dateOfBirth,
      password: hashPassword,
    });
    if (newuser) {
      return res.send({
        code: 200,
        msg: "Regsiter successfully",
        user: newuser,
      });
    }
  } catch (error) {
    console.log("Error in RegisterController =>", error);
    res.send({ code: 500, msg: "Internal Server Error" });
  }
};

export const GoogleLogin = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in GoogleLogin =>", error);
    res.send({ code: 500, msg: "Internal Server Error" });
  }
};
