import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../models/user.js"

export const loginApi = express.Router();

loginApi.post("/login", async (req, res) => {
    console.log("POST /login")

    const { email, password } = req.body;
    console.log({ email })

    const userWithEmail = await User.findOne({ where: { email } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    console.log({ userWithEmail })

    if (await bcrypt.compare(password, userWithEmail.password)) {
        const jwtToken = jwt.sign(
            { id: userWithEmail.id, email: userWithEmail.email },
            "process.env.JWT_SECRET"
        );

        return res.json({ message: "Welcome Back!", token: jwtToken });
    } else {
        return res
            .status(400)
            .json({ message: "Email or password does not match!" });
    }

    // if (alreadyExistsUser) {
    //     return res.status(409).json({ success: false, message: "User with email already exists!" });
    // }

    // const hashedPassword = await bcrypt.hash(password, 10);

    // const newUser = new User({
    //     name: name,
    //     email: email,
    //     password: hashedPassword,
    // });

    // try {
    //     const savedUser = await newUser.save()
    //     const resData = {
    //         name: savedUser.name,
    //         email: savedUser.email
    //     }

    //     return res.status(200).json({ success: true, message: "Thanks for registering", data: resData });
    // } catch (error) {
    //     return res.status(500).json({ success: false, message: error.message });
    // }
    return res
});