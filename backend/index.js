import express from "express";
import * as dotenv from 'dotenv'
import morgan from "morgan";
import printRoutes from "express-list-endpoints";
import cors from "cors";
import helmet from "helmet";
import { routerAPI } from "./app/controllers/api/index.js";
import { notFound, errorHandler } from "./middlewares.js";
// import passport from "passport"
import * as passport from "./app/auth/passport.js"

// require("./app/models/user");

dotenv.config()

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());



app.use("/api/v1", routerAPI);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json("hello");
});

app.listen(process.env.PORT_BACKEND, async () => {
  console.log("Connected to backend.");
  // console.log(printRoutes(app));
});
