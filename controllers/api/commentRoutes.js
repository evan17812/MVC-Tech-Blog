const router = require("express").Router();
const { Comments } = require("../../models");

router.post("/", async (req, res) => {
  try {
    // Create a new comment in the database with the provided data and the user's ID
    const commentsData = await Comments.create({
      ...req.body,
      userId: req.session.user_id,
    });

    res.status(200).json(commentsData);
  } catch (err) {

    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;