import express from "express";

export const checkApi = express.Router();

checkApi.get("/check", (req, res) => {
    res.send("check");
});

