import bodyParser from "body-parser";
import express from "express";
import connectDB from "./db/db.js";

// Importing Routes
import passport from "./auth/auth.js";
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

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
  res.send("Welcome to Hotel");
});

// ==> Import the router files
app.use("/person", localAuthMiddleware, personRouter);
app.use("/menu", localAuthMiddleware, menuItemRouter);

app.listen(port, () => {
  console.log("Server is listening at port: ", port);
});
