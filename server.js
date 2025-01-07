import bodyParser from "body-parser";
import express from "express";
import connectDB from "./db/db.js";

// Importing Routes
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import menuItemRouter from "./routes/menuItem.routes.js";
import personRouter from "./routes/person.routes.js";

const app = express();
const port = 8003;

// Connecting to MongoDB Server
connectDB();

// Middlewares
app.use(bodyParser.json());

// ==> Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`
  );

  next(); // move to next phase
};

app.use(logRequest);

app.use(new LocalStrategy(async (username, password, done) => {

  // Authentication logic
  try {
    
  } catch (error) {
    
  }


}))

app.get("/", (req, res) => {
  res.send("Welcome to Hotel");
});

// ==> Import the router files
app.use("/person", personRouter);
app.use("/menu", menuItemRouter);

app.listen(port, () => {
  console.log("Server is listening at port: ", port);
});
