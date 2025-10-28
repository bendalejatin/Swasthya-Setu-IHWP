const { Todo, HealthTracking, Report } = require("../Models/Todo");
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });
  
  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Todo CRUD operations
const createTodo = async (req, res) => {
  try {
    const todo = new Todo({ ...req.body, userId: req.userId });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const { category, completed } = req.query;
    const filter = { userId: req.userId };
    if (category) filter.category = category;
    if (completed !== undefined) filter.completed = completed === 'true';
    
    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { ...req.body, ...(req.body.completed && { completedAt: new Date() }) },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Health tracking
const updateHealthTracking = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    const healthData = await HealthTracking.findOneAndUpdate(
      { userId: req.userId, date: { $gte: startOfDay, $lt: endOfDay } },
      { ...req.body, userId: req.userId, date: startOfDay },
      { new: true, upsert: true }
    );
    res.json(healthData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getHealthTracking = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    const healthData = await HealthTracking.findOne({ 
      userId: req.userId, 
      date: { $gte: startOfDay, $lt: endOfDay }
    });
    res.json(healthData || { waterIntake: 0, exerciseMinutes: 0, sleepHours: 0, mood: '', notes: '' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Report generation
const generateReport = async (req, res) => {
  try {
    const { type = 'daily' } = req.query;
    const now = new Date();
    let startDate, endDate;

    if (type === 'daily') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    } else if (type === 'weekly') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      endDate = new Date();
    } else if (type === 'monthly') {
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      endDate = new Date();
    } else if (type === 'overall') {
      startDate = new Date('2020-01-01');
      endDate = new Date();
    } else {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    }

    // Get todos data
    const todos = await Todo.find({
      userId: req.userId,
      createdAt: { $gte: startDate, $lt: endDate }
    });

    // Get health data
    const healthData = await HealthTracking.find({
      userId: req.userId,
      date: { $gte: startDate, $lt: endDate }
    });

    // Calculate metrics
    const completedTodos = todos.filter(t => t.completed).length;
    const totalTodos = todos.length;
    const avgWaterIntake = healthData.length > 0 ? healthData.reduce((sum, h) => sum + (h.waterIntake || 0), 0) / healthData.length : 0;
    const avgExercise = healthData.length > 0 ? healthData.reduce((sum, h) => sum + (h.exerciseMinutes || 0), 0) / healthData.length : 0;
    const avgSleep = healthData.length > 0 ? healthData.reduce((sum, h) => sum + (h.sleepHours || 0), 0) / healthData.length : 0;

    // Generate suggestions based on data
    const suggestions = [];
    const completionRate = totalTodos > 0 ? completedTodos / totalTodos : 0;
    
    // Task completion suggestions
    if (totalTodos === 0) {
      suggestions.push("Start by creating wellness tasks to track your progress");
    } else if (completionRate < 0.3) {
      suggestions.push("Focus on completing existing tasks before adding new ones");
    } else if (completionRate < 0.7) {
      suggestions.push("Break down large tasks into smaller, manageable steps");
    } else if (completionRate >= 0.9) {
      suggestions.push("Excellent task completion! Consider setting more challenging goals");
    }
    
    // Water intake suggestions
    if (avgWaterIntake === 0) {
      suggestions.push("Start tracking your daily water intake for better hydration");
    } else if (avgWaterIntake < 4) {
      suggestions.push("Significantly increase water intake - aim for at least 6-8 glasses daily");
    } else if (avgWaterIntake < 8) {
      suggestions.push("Good start! Try to reach 8-10 glasses of water daily");
    } else if (avgWaterIntake > 12) {
      suggestions.push("Great hydration! Maintain this excellent water intake habit");
    }
    
    // Exercise suggestions
    if (avgExercise === 0) {
      suggestions.push("Begin with 10-15 minutes of light exercise daily");
    } else if (avgExercise < 15) {
      suggestions.push("Gradually increase exercise to 30 minutes daily for optimal health");
    } else if (avgExercise < 30) {
      suggestions.push("You're on track! Aim for 30+ minutes of daily exercise");
    } else if (avgExercise >= 60) {
      suggestions.push("Outstanding exercise routine! Ensure adequate rest and recovery");
    }
    
    // Sleep suggestions
    if (avgSleep === 0) {
      suggestions.push("Track your sleep patterns to improve rest quality");
    } else if (avgSleep < 6) {
      suggestions.push("Prioritize sleep - aim for 7-8 hours nightly for better health");
    } else if (avgSleep < 7) {
      suggestions.push("Increase sleep duration to 7-8 hours for optimal recovery");
    } else if (avgSleep > 9) {
      suggestions.push("Good sleep duration! Focus on sleep quality and consistency");
    }
    
    // Category-specific suggestions
    const categories = todos && todos.length > 0 ? todos.reduce((acc, todo) => {
      acc[todo.category] = (acc[todo.category] || 0) + 1;
      return acc;
    }, {}) : {};
    
    if (categories.water && categories.water > 3) {
      suggestions.push("Great focus on hydration tasks! Consider water reminder apps");
    }
    if (categories.exercise && categories.exercise > 3) {
      suggestions.push("Excellent exercise planning! Mix cardio and strength training");
    }
    if (categories.meditation && categories.meditation > 2) {
      suggestions.push("Wonderful mindfulness practice! Try different meditation techniques");
    }
    
    // Overall wellness suggestions
    if (type === 'weekly' && completionRate > 0.8 && avgWaterIntake > 7 && avgExercise > 25) {
      suggestions.push("Exceptional wellness week! You're building great healthy habits");
    }
    
    // Ensure at least one suggestion
    if (suggestions.length === 0) {
      suggestions.push("Keep tracking your wellness journey for personalized insights!");
    }

    const reportData = {
      userId: req.userId,
      date: new Date(),
      type,
      data: {
        completedTodos,
        totalTodos,
        waterIntake: Math.round(avgWaterIntake * 10) / 10,
        exerciseMinutes: Math.round(avgExercise),
        sleepHours: Math.round(avgSleep * 10) / 10
      },
      suggestions
    };

    const report = new Report(reportData);
    await report.save();

    res.json(reportData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.userId }).sort({ createdAt: -1 }).limit(10);
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  verifyToken,
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  updateHealthTracking,
  getHealthTracking,
  generateReport,
  getReports
};