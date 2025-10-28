const Assessment = require("../Models/Assessment");

const saveAssessment = async (req, res) => {
  try {
    console.log('Received assessment data:', req.body);
    const { userId, type, responses, results } = req.body;
    
    if (!userId || !type || !responses || !results) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    const assessment = new Assessment({
      userId,
      type,
      responses,
      results
    });

    const savedAssessment = await assessment.save();
    console.log('Assessment saved:', savedAssessment);
    res.status(201).json({ message: "Assessment saved successfully", assessment: savedAssessment });
  } catch (error) {
    console.error('Error saving assessment:', error);
    res.status(500).json({ error: error.message });
  }
};

const getUserAssessments = async (req, res) => {
  try {
    const { userId } = req.params;
    const assessments = await Assessment.find({ userId }).sort({ completedAt: -1 });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { saveAssessment, getUserAssessments };