import { Router } from "express";
import { generateToken, jwtAuthMiddleware } from "../auth/jwt.js";
import { Person } from "../models/person.model.js";

const router = Router();

// Profile Route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log("ERROR While fetching Persons Data :::");
    console.log(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    // Create a new person document using the mongoose model
    const newPerson = new Person(data);

    // Save the person to database
    const response = await newPerson.save();
    console.log("Data saved successfully");

    const payload = {
      id: response.id,
      username: response.username,
    };

    console.log(payload);

    const token = generateToken(payload);

    console.log("Token is: ", token);

    res.status(200).json({
      response: response,
      token: token,
    });
  } catch (error) {
    console.log("Error on saving person data.");
    console.log(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Find the user by username
    const user = await Person.findOne({ username });

    // I user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate token
    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload);

    // Return token as response
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.get("/:workType", async (req, res) => {
  const workType = req.params.workType;

  try {
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({
        error: "Invalid work type",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }

  // res.send(workType);
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    console.log("Updating Started . . .");

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // returns the udpated document
        runValidators: true, // Run Mongoose Validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data updated");
    console.log(response);

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data deleted");
    // console.log(response);

    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
