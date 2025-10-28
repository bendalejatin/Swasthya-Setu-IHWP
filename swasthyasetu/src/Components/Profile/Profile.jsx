import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { getUserAssessments } from '../../services/assessmentService';
import AssessmentModal from './AssessmentModal';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [todos, setTodos] = useState([]);
  const [healthData, setHealthData] = useState([]);
  const [reports, setReports] = useState([]);

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  useEffect(() => {
    if (user && (user._id || user.id)) {
      getUserAssessments(user._id || user.id)
        .then(setAssessments)
        .catch(console.error)
        .finally(() => setLoading(false));
      loadTodos();
      loadReports();
      loadHealthData();
    } else {
      setLoading(false);
    }
  }, []);

  const loadTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        const sorted = data.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        setTodos(sorted.slice(0, 3));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
      setTodos([]);
    }
  };

  const loadReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reports', {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setReports(sorted.slice(0, 3));
      }
    } catch (error) {
      console.error('Error loading reports:', error);
      setReports([]);
    }
  };

  const loadHealthData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/health', {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        setHealthData(data);
      }
    } catch (error) {
      console.error('Error loading health data:', error);
      setHealthData([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!user) {
    return <p className="profile-message">User not logged in</p>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <div className="profile-tag">🌿 Swasthya Setu Wellness Portal</div>
        <h1>Your Wellness Profile</h1>
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : '👤'}
          </div>
          
          <h2 className="profile-title">
            <span className="name-highlight">{user.name || "User"}</span>
          </h2>

          <div className="profile-info">
            <span className="label">📧 Email</span>
            <span className="value">{user.email}</span>
          </div>

          {user.phone && (
            <div className="profile-info">
              <span className="label">📱 Phone</span>
              <span className="value">{user.phone}</span>
            </div>
          )}

          <button className="logout-button" onClick={handleLogout}>
            <LogoutIcon/> Logout
          </button>
        </div>

        <div className="assessment-history">
          <h3>📋 Assessment History</h3>
          {loading ? (
            <div style={{padding: '40px', textAlign: 'center', color: '#666'}}>
              Loading your wellness journey...
            </div>
          ) : assessments.length > 0 ? (
            <div className="history-list">
              {assessments.map((assessment, index) => (
                <div key={assessment._id} className="history-item" onClick={() => setSelectedAssessment(assessment)}>
                  <div className="history-header">
                    <span className="assessment-type">Dosha Assessment #{assessments.length - index}</span>
                    <span className="assessment-date">{new Date(assessment.completedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="history-results">
                    <span className="dominant-dosha">Dominant: {assessment.results.dominant}</span>
                    <div className="dosha-percentages">
                      <span>Vata: {assessment.results.percentages.Vata}%</span>
                      <span>Pitta: {assessment.results.percentages.Pitta}%</span>
                      <span>Kapha: {assessment.results.percentages.Kapha}%</span>
                    </div>
                  </div>
                  <div className="view-details">✨ Click to view detailed results</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{padding: '60px 30px', textAlign: 'center'}}>
              <div style={{fontSize: '48px', marginBottom: '20px'}}>🌱</div>
              <h4 style={{color: '#2d5016', marginBottom: '10px'}}>Start Your Wellness Journey</h4>
              <p style={{color: '#666', marginBottom: '20px'}}>No assessments completed yet.</p>
              <a href="/dosha-assessment" style={{
                background: 'linear-gradient(135deg, #2d5016, #68a340)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-block'
              }}>Take Your First Assessment</a>
            </div>
          )}
        </div>

        <div className="wellness-overview">
          <div className="wellness-header">
            <h3>📊 Wellness Overview</h3>
            <p className="wellness-subtitle">Track your daily progress and wellness metrics</p>
          </div>
          
          <div className="wellness-stats">
            <div className="stat-item">
              <div className="stat-icon">💧</div>
              <div className="stat-info">
                <span className="stat-value">{healthData.waterIntake || 0}</span>
                <span className="stat-label">Glasses Today</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🏃</div>
              <div className="stat-info">
                <span className="stat-value">{healthData.exerciseMinutes || 0}</span>
                <span className="stat-label">Minutes Exercise</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">😴</div>
              <div className="stat-info">
                <span className="stat-value">{healthData.sleepHours || 0}</span>
                <span className="stat-label">Hours Sleep</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <span className="stat-value">{todos.filter(t => t.completed).length}</span>
                <span className="stat-label">Tasks Done</span>
              </div>
            </div>
          </div>
          
          <div className="wellness-grid">
            <div className="wellness-card">
              <div className="card-header">
                <h4>📝 Recent Tasks</h4>
                <span className="task-count">{todos.length} tasks</span>
              </div>
              {todos.length > 0 ? (
                <div className="task-list">
                  {todos.map(todo => (
                    <div key={todo._id} className="task-item">
                      <div className="task-main">
                        <span className={`task-status ${todo.completed ? 'completed' : 'pending'}`}>
                          {todo.completed ? '✅' : '⏳'}
                        </span>
                        <div className="task-content">
                          <span className="task-title">{todo.title}</span>
                          <div className="task-meta">
                            <span className={`task-category ${todo.category}`}>{todo.category}</span>
                            <span className={`task-priority ${todo.priority}`}>{todo.priority}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📝</div>
                  <p className="empty-text">No tasks created yet</p>
                  <p className="empty-subtext">Start organizing your wellness journey</p>
                </div>
              )}
              <a href="/todo-manager" className="view-all-link">Manage Tasks →</a>
            </div>

            <div className="wellness-card">
              <div className="card-header">
                <h4>📈 Progress Reports</h4>
                <span className="report-count">{reports.length} reports</span>
              </div>
              {reports.length > 0 ? (
                <div className="report-list">
                  {reports.map(report => (
                    <div key={report._id} className="report-item">
                      <div className="report-main">
                        <div className="report-type-badge">{report.type}</div>
                        <div className="report-content">
                          <div className="report-date">{new Date(report.date).toLocaleDateString()}</div>
                          <div className="report-stats">
                            <span className="stat-chip">📋 {report.data.completedTodos}/{report.data.totalTodos} Tasks</span>
                            <span className="stat-chip">💧 {report.data.waterIntake} glass water </span>
                            <span className="stat-chip">🏃 {report.data.exerciseMinutes} min. excercise</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📊</div>
                  <p className="empty-text">No reports generated yet</p>
                  <p className="empty-subtext">Generate insights about your progress</p>
                </div>
              )}
              <a href="/todo-manager" className="view-all-link">View Reports →</a>
            </div>
          </div>
        </div>
      </div>
      
      <AssessmentModal 
        assessment={selectedAssessment} 
        onClose={() => setSelectedAssessment(null)} 
      />
    </div>
  );
};

export default Profile;
