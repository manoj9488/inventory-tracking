import bcrypt from "bcryptjs";
import registrationModel from "../models/registrationModel.js";



export const loginUser = async (req, res) => {
 try{
    const { email, password } = req.body;
    const user = await registrationModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json({ message: "Login successful", user });    
 } catch (error) {
    res.status(500).json({ message: "Login failed", error });           
 }
 }   

 export const adminLogin = async (req, res) => {
  try{
     const { email, password } = req.body;
     const user = await registrationModel.findOne({ email});
     if (!user) {
       return res.status(401).json({ message: "Invalid email or password" });
     }
     const isPasswordValid = await bcrypt.compare(password, user.password);
     if (!isPasswordValid) {
       return res.status(401).json({ message: "Invalid email or password" });
     }
     res.status(200).json({ message: "Login successful", user });    
  } catch (error) {
     res.status(500).json({ message: "Login failed", error });           
  }
  }