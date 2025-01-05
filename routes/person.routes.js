import { Router } from "express";
import { Person } from "../models/person.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log("ERROR While fetching Persons Data :::");
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    // Create a new person document using the mongoose model
    const newPerson = new Person(data);

    // Save the person to database
    const savedPerson = await newPerson.save();
    console.log("Data saved successfully");

    res.status(200).json({
      savedPerson,
    });
  } catch (error) {
    console.log("Error on saving person data.");
    console.log(error);

    res.status(500).json({
      error: "Internal server error",
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
