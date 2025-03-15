const exp = require("express");
const adminApp = exp.Router();
const UserAuthor = require("../models/userAuthorModel");

adminApp.use(exp.json());

// Get all users and authors
adminApp.get("/users-authors", async (req, res) => {
  try {
    const users = await UserAuthor.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users and authors" });
  }
});

// Enable or disable a user/author
adminApp.put("/update-status/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { isActive } = req.body;

    const user = await UserAuthor.findOneAndUpdate({ email },{ isActive },{ new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: `User ${isActive ? "enabled" : "disabled"} successfully`, user });
  } catch (error) {
    res.status(500).json({ error: "Error updating user status" });
  }
});

module.exports = adminApp;
