const Challenge = require("../models/challengeModel");

// CREATE challenge
exports.createChallenge = async (req, res) => {
  const { title, goal, duration } = req.body;

  if (!title || !goal || !duration) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const challenge = await Challenge.create({
    user: req.user,
    title,
    goal,
    duration
  });

  res.status(201).json(challenge);
};

// GET all challenges
exports.getChallenges = async (req, res) => {
  const challenges = await Challenge.find({ user: req.user });

  res.status(200).json(challenges);
};

// UPDATE challenge
exports.updateChallenge = async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    res.status(404);
    throw new Error("Challenge not found");
  }

  const updatedChallenge = await Challenge.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedChallenge);
};

// DELETE challenge
exports.deleteChallenge = async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    res.status(404);
    throw new Error("Challenge not found");
  }

  await challenge.deleteOne();

  res.json({ message: "Challenge deleted" });
};