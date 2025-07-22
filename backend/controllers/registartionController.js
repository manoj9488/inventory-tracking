import registrationModel from "../models/registrationModel";

export const getRegistration = async (req, res) => {
    try {
       const {name, email, password, confirmpassword, role} = req.body;
       const registration = await registrationModel.create({
        name, email, password, confirmpassword, role
       });
       res.status(201).json(registration);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};