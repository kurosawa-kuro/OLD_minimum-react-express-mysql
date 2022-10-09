import express from "express";
import { checkApi } from "./check.js";
import { bookApi } from "./book.js";
import { registerApi } from "./auth/register.js";
import { loginApi } from "./auth/login.js";
import { profileApi } from "./auth/profile.js";

export const routerAPI = express.Router();

routerAPI.use(checkApi);
routerAPI.use(bookApi);
routerAPI.use(registerApi);
routerAPI.use(loginApi);
routerAPI.use(profileApi);
