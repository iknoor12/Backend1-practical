const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createChallenge,
  getChallenges,
  updateChallenge,
  deleteChallenge
} = require("../controllers/challengeController");

router.route("/")
  .get(protect, getChallenges)
  .post(protect, createChallenge);

router.route("/:id")
  .put(protect, updateChallenge)
  .delete(protect, deleteChallenge);

module.exports = router;