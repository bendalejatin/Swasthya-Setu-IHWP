const express = require("express");
const { getAllUsers, getAllAssessments, getStats, adminLogin, getUserDetails, getChartData, getAllTodos, getAllReports } = require("../Controllers/adminController");

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", getAllUsers);
router.get("/users/:userId", getUserDetails);
router.get("/assessments", getAllAssessments);
router.get("/todos", getAllTodos);
router.get("/reports", getAllReports);
router.get("/stats", getStats);
router.get("/charts", getChartData);

module.exports = router;