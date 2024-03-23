const router = require("express").Router();
const { Blogpost, User } = require("../../models");
// Route: Get all blogposts with associated user data
router.get("/", async (req, res) => {
  try {
    // Fetch all blogposts from the database
    const blogpostData = await Blogpost.findAll({
      include: [{ model: User }],
    });
    // Respond with the retrieved blogpost data as JSON
    res.status(200).json(blogpostData);
  } catch (err) {
    // Handle errors and respond with a JSON error message
    res.status(400).json(err);
  }
});
// Route: Get a specific blogpost by ID with associated comments and user data
router.get("/:id", async (req, res) => {
  try {
    // Fetch a specific blogpost by its ID, including associated comments and user data
    const blogpostData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: Comments,
          include: [{ model: User, as: "User", attributes: ["username"] }],
        },
      ],
    });
    // Respond with the retrieved blogpost data as JSON
    res.status(200).json(blogpostData);
  } catch (err) {
    // Handle errors and respond with a JSON error message
    res.status(400).json(err);
  }
});
// Route: Create a new blogpost
router.post("/", async (req, res) => {
  try {
    // Create a new blogpost in the database with the provided data and the user's ID
    const blogpostData = await Blogpost.create({
      ...req.body,
      userId: req.session.user_id,
    });
    // Respond with the created blogpost data as JSON
    res.status(200).json(blogpostData);
  } catch (err) {
    // Log errors, handle them, and respond with a JSON error message
    console.log(err);
    res.status(400).json(err);
  }
});
// Route: Update a specific blogpost by ID
router.put("/:id", async (req, res) => {
  try {
    // Update the specified blogpost in the database with the provided data
    const blogpostData = await Blogpost.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.session.user_id,
      },
    });
    // Check if the blogpost was found and updated successfully
    if (!blogpostData) {
      res.status(404).json({ message: "No blogpost found with this id!" });
      return;
    }

    res.status(200).json(blogpostData);

  } catch (err) {
    res.status(500).json(err);
  }
});
// Route: Delete a specific blogpost by ID
router.delete("/:id", async (req, res) => {
  try {

    const blogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        userId: req.session.user_id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: "No blogpost found with this id!" });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {

    res.status(500).json(err);
  }
});

module.exports = router;