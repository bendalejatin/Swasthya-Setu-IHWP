const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { 
    type: String, 
    enum: ["general", "water", "exercise", "food", "meditation", "sleep"], 
    default: "general" 
  },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

const healthTrackingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  waterIntake: { type: Number, default: 0 }, // in glasses
  exerciseMinutes: { type: Number, default: 0 },
  meals: [{
    name: String,
    calories: Number,
    time: Date
  }],
  sleepHours: { type: Number, default: 0 },
  mood: { type: String, enum: ["excellent", "good", "okay", "poor", "terrible"] },
  notes: { type: String }
});

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ["daily", "weekly", "monthly"], required: true },
  data: {
    completedTodos: Number,
    totalTodos: Number,
    waterIntake: Number,
    exerciseMinutes: Number,
    averageMood: String,
    sleepHours: Number
  },
  suggestions: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  Todo: mongoose.model("Todo", todoSchema),
  HealthTracking: mongoose.model("HealthTracking", healthTrackingSchema),
  Report: mongoose.model("Report", reportSchema)
};