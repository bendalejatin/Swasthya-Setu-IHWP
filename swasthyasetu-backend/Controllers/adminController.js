const User = require("../Models/User");
const Assessment = require("../Models/Assessment");
const Admin = require("../Models/Admin");
const { Todo, HealthTracking, Report } = require("../Models/Todo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ _id: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({})
      .populate('userId', 'name email')
      .sort({ completedAt: -1 });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    
    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const token = jwt.sign({ adminId: admin._id }, "admin_secret", { expiresIn: "24h" });
    res.json({ token, admin: { username: admin.username, email: admin.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId, '-password');
    const assessments = await Assessment.find({ userId }).sort({ completedAt: -1 });
    const todos = await Todo.find({ userId }).sort({ createdAt: -1 }).limit(10);
    const healthData = await HealthTracking.find({ userId }).sort({ date: -1 }).limit(7);
    const reports = await Report.find({ userId }).sort({ createdAt: -1 }).limit(5);
    
    res.json({ user, assessments, todos, healthData, reports });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAssessments = await Assessment.countDocuments();
    const recentAssessments = await Assessment.countDocuments({
      completedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    const totalTodos = await Todo.countDocuments();
    const completedTodos = await Todo.countDocuments({ completed: true });
    const totalReports = await Report.countDocuments();
    
    res.json({
      totalUsers,
      totalAssessments,
      recentAssessments,
      totalTodos,
      completedTodos,
      totalReports
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChartData = async (req, res) => {
  try {
    const doshaStats = await Assessment.aggregate([
      { $group: { _id: '$results.dominant', count: { $sum: 1 } } }
    ]);
    
    const dailyStats = await Assessment.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$completedAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 7 }
    ]);
    
    res.json({ doshaStats, dailyStats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUsers, getAllAssessments, getStats, adminLogin, getUserDetails, getChartData, getAllTodos, getAllReports };