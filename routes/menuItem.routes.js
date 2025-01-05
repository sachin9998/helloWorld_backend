import { Router } from "express";
import { MenuItem } from "../models/menuItem.model.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    // Create a new person document using the mongoose model
    const newMenu = new MenuItem(data);

    // Save the person to database
    const response = await newMenu.save();
    console.log("Data saved successfully");

    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log("Error on saving person data.");
    console.log(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Menu items fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.get("/:taste", async (req, res) => {
  const taste = req.params.taste;

  try {
    if (taste == "spicy" || taste == "sweet" || taste == "sour") {
      const response = await MenuItem.find({ taste: taste });
      console.log("Menu items based on taste fetched");
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

export default router;
