import express from "express";
import passport from "passport";

export const profileApi = express.Router();

profileApi.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const user = {
            name: req.user.dataValues.name,
            email: req.user.dataValues.email,
        };

        res.status(200).json({ message: "Success Profile", data: user });
    }
);