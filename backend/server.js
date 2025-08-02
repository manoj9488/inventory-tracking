import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRoutes from './routes/Adminroute.js';
import userRoutes from './routes/UserRoute.js';


dotenv.config();
const app = express();

app.use(express.json()); 
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
import connectDB from './config/db.js';
connectDB();


app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

import registrationRoutes from './routes/Registrationrouts.js';
app.use('/api/registration', registrationRoutes);

import LoginRoutes from './routes/Loginroutes.js';
app.use('/api/login', LoginRoutes);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});