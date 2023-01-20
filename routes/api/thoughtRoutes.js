const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  deleteThought,
  deleteReaction,
  updateThought,
  createReaction,
  createThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .post(updateThought)
  .delete(deleteThought);
router.route("/:thoughtId/reactions").post(createReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
