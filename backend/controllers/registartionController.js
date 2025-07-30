import Registration from "../models/registrationModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegistration = async (req, res) => {
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
// export const getRegistration =async (req ,res) => {
//   try {
//     const registration = await Registration.find();
//     res.status(200).json(registration);
//   } catch (error) {
//     res.status(500).json({ message: "Registration failed", error });
//   }
// }
 
// export const putRegistration =async (req ,res) => {
//   try {
//     const registration =await registration .findbyId(req.params.id);
//     await registration .update(req.body);
//     res.status(200).json(registration);
// }    catch(error){
//   res.status(500).jason({message: "Registaration failed", error})
// }
// }


//  export const deleteRegistration =async (req ,res) => {
//   try{const registration =await registartion .findbyId(req.params.id);
//     await registration .remove();
//     res.status(200).json(registration);
// }    catch(error){
//   res.status(500).jason({message: "Registaration failed", error})
// }
//   }
 
