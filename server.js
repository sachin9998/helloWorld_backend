import bodyParser from "body-parser";
import express, { response } from "express";
import connectDB from "./db/db.js";

// Importing Routes
import menuItemRouter from "./routes/menuItem.routes.js";
import personRouter from "./routes/person.routes.js";

const app = express();
const port = 8003;

// Middlewares
app.use(bodyParser.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Hotel");
});

// Import the router files
app.use("/person", personRouter);
app.use("/menu", menuItemRouter);

app.listen(port, () => {
  console.log("Server is listening at port: ", port);
});
