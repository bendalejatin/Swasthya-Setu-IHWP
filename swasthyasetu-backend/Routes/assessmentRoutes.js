const express = require("express");
const { saveAssessment, getUserAssessments } = require("../Controllers/assessmentController");

const router = express.Router();

router.post("/assessment", saveAssessment);
router.get("/assessment/:userId", getUserAssessments);

module.exports = router;