import Registration from "../models/registrationModel.js";
import bcrypt from "bcryptjs";


export const userRegistration = async (req, res) => {0 
  try {
    const { name, email, password,role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const registration = new Registration({
      name,
      email,
      password: hashPassword,
      role,
    });
    await registration.save();
    res.status(201).json({ message: "Registration successful", registration});
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

export const AdminRegistration = async (req, res) => {
  try{
    const { name,email, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Registration({
      name,
      email, 
      password: hashPassword,
      role,
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin Registration successful", newAdmin});
  } catch (error) {
    res.status(500).json({ message: "Admin Registration failed", error });
  }
}

export const getRegistration = async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch registrations", error });
  }
};

export const deleteuser = async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};