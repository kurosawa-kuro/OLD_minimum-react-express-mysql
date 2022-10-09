import express from "express";
import { checkApi } from "./check.js";
import { bookApi } from "./book.js";

export const router = express.Router();

router.use(checkApi);
router.use(bookApi);
