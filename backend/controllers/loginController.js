import bcrypt from "bcryptjs";
import registrationModel from "../models/registrationModel.js";
import jwt from "jsonwebtoken";



// export const loginUser = async (req, res) => {
//  try{
//     const { email, password } = req.body;
//     const user = await registrationModel.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//     res.status(200).json({ message: "Login successful", user });    
//  } catch (error) {
//     res.status(500).json({ message: "Login failed", error });           
//  }
//  }   

//  export const adminLogin = async (req, res) => {
//   try{
//      const { email, password } = req.body;
//      const user = await registrationModel.findOne({ email});
//      if (!user) {
//        return res.status(401).json({ message: "Invalid email or password" });
//      }
//      const isPasswordValid = await bcrypt.compare(password, user.password);
//      if (!isPasswordValid) {
//        return res.status(401).json({ message: "Invalid email or password" });
//      }
//      res.status(200).json({ message: "Login successful", user });    
//   } catch (error) {
//      res.status(500).json({ message: "Login failed", error });           
//   }
//   }

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await registrationModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await registrationModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id, username: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
