import Registration from "../models/registrationModel.js";
import bcrypt from "bcryptjs";

export const createRegistration = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const registration = new Registration({
      name,
      email,
      password: hashPassword,
      role,
    });
    await registration.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};