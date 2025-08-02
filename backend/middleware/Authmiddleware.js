// import express from "express";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// const authMiddleware = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decodedToken;
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(401).json({ message: "Unauthorized" });
//     }
// };

// export default authMiddleware;

import jwt from "jsonwebtoken";
import User from "../models/registrationModel.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, "secret123");
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
