const express = require("express");
const {
  verifyToken,
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  updateHealthTracking,
  getHealthTracking,
  generateReport,
  getReports
} = require("../Controllers/todoController");

const router = express.Router();

// Todo routes
router.post("/todos", verifyToken, createTodo);
router.get("/todos", verifyToken, getTodos);
router.put("/todos/:id", verifyToken, updateTodo);
router.delete("/todos/:id", verifyToken, deleteTodo);

// Health tracking routes
router.post("/health", verifyToken, updateHealthTracking);
router.get("/health", verifyToken, getHealthTracking);

// Report routes
router.get("/reports/generate", verifyToken, generateReport);
router.get("/reports", verifyToken, getReports);
router.delete("/reports/:id", verifyToken, async (req, res) => {
  try {
    const { Report } = require("../Models/Todo");
    const report = await Report.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;