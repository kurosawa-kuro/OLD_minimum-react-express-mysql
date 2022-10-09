import express from "express";
import bcrypt from "bcrypt";
import { User } from "../../../models/user.js"

export const registerApi = express.Router();

registerApi.post("/register", async (req, res) => {
    console.log("Get /register")

    const { name, email, password } = req.body;
    console.log({ email })

    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    // console.log({ alreadyExistsUser })

    if (alreadyExistsUser) {
        return res.status(409).json({ success: false, message: "User with email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
    });

    try {
        const savedUser = await newUser.save()
        const resData = {
            name: savedUser.name,
            email: savedUser.email
        }

        return res.status(200).json({ success: true, message: "Thanks for registering", data: resData });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});