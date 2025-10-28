const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true, enum: ["dosha"] },
  responses: [{ type: String, required: true }],
  results: {
    percentages: {
      Vata: { type: Number, required: true },
      Pitta: { type: Number, required: true },
      Kapha: { type: Number, required: true }
    },
    dominant: { type: String, required: true },
    secondary: { type: String, required: true }
  },
  completedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Assessment", assessmentSchema);