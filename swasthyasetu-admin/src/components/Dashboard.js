import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, getAssessments, getStats, getChartData, getTodos, getReports } from '../services/adminService';
import AssessmentModal from './AssessmentModal';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import './Dashboard.css';
import whiteLogo from './asset/Logo.svg';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('stats');
  const [users, setUsers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [todos, setTodos] = useState([]);
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/');
      return;
    }
    loadData();
  }, [activeTab, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      console.log('Loading data for tab:', activeTab);
      if (activeTab === 'stats') {
        console.log('Fetching stats...');
        const statsData = await getStats();
        console.log('Stats data:', statsData);
        setStats(statsData);
        
        try {
          console.log('Fetching charts...');
          const chartsData = await getChartData();
          console.log('Charts data:', chartsData);
          setChartData(chartsData);
        } catch (chartError) {
          console.log('Charts not available:', chartError.message);
          setChartData(null);
        }
      } else if (activeTab === 'users') {
        console.log('Fetching users...');
        const usersData = await getUsers();
        console.log('Users data:', usersData);
        setUsers(usersData);
      } else if (activeTab === 'assessments') {
        console.log('Fetching assessments...');
        const assessmentsData = await getAssessments();
        console.log('Assessments data:', assessmentsData);
        setAssessments(assessmentsData);
      } else if (activeTab === 'todos') {
        console.log('Fetching todos...');
        const todosData = await getTodos();
        console.log('Todos data:', todosData);
        setTodos(todosData);
      } else if (activeTab === 'reports') {
        console.log('Fetching reports...');
        const reportsData = await getReports();
        console.log('Reports data:', reportsData);
        setReports(reportsData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error loading data: ' + error.message);
    }
    setLoading(false);
  };

  const loadUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/users/${userId}`);
      const data = await response.json();
      setUserDetails(data);
      setSelectedUser(userId);
    } catch (error) {
      console.error('Error loading user details:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-dashboard-logo">
          <img src={whiteLogo} alt="Swasthya Setu Logo" />
          <h1>Swasthya Setu Admin</h1>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="admin-content">
        <div className="admin-tabs">
          <button 
            className={activeTab === 'stats' ? 'active' : ''} 
            onClick={() => setActiveTab('stats')}
          >
            📊 Statistics
          </button>
          <button 
            className={activeTab === 'users' ? 'active' : ''} 
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
          <button 
            className={activeTab === 'assessments' ? 'active' : ''} 
            onClick={() => setActiveTab('assessments')}
          >
            📋 Assessments
          </button>
          <button 
            className={activeTab === 'todos' ? 'active' : ''} 
            onClick={() => setActiveTab('todos')}
          >
            ✅ Todo Manager
          </button>
          <button 
            className={activeTab === 'reports' ? 'active' : ''} 
            onClick={() => setActiveTab('reports')}
          >
            📊 Reports
          </button>
        </div>

        {loading && <div className="loading">Loading...</div>}

        {activeTab === 'stats' && (
          <div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>{stats.totalUsers || 0}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📋</div>
                <div className="stat-info">
                  <h3>{stats.totalAssessments || 0}</h3>
                  <p>Total Assessments</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🔥</div>
                <div className="stat-info">
                  <h3>{stats.recentAssessments || 0}</h3>
                  <p>Recent (7 days)</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <h3>{stats.totalTodos || 0}</h3>
                  <p>Total Todos</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <h3>{stats.totalReports || 0}</h3>
                  <p>Total Reports</p>
                </div>
              </div>
            </div>
            
            {chartData && (
              <div className="charts-grid">
                <div className="chart-card">
                  <h4>Dosha Distribution</h4>
                  <Doughnut 
                    data={{
                      labels: chartData.doshaStats.map(d => d._id),
                      datasets: [{
                        data: chartData.doshaStats.map(d => d.count),
                        backgroundColor: ['#4dabf7', '#fa5252', '#40c057']
                      }]
                    }}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
                <div className="chart-card">
                  <h4>Daily Assessments (Last 7 Days)</h4>
                  <Bar 
                    data={{
                      labels: chartData.dailyStats.map(d => d._id),
                      datasets: [{
                        label: 'Assessments',
                        data: chartData.dailyStats.map(d => d.count),
                        backgroundColor: '#2d5016'
                      }]
                    }}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-grid">
            <div className="users-list">
              <h3>All Users</h3>
              {users.map(user => (
                <div 
                  key={user._id} 
                  className={`user-item ${selectedUser === user._id ? 'selected' : ''}`}
                  onClick={() => loadUserDetails(user._id)}
                >
                  <div className="user-info">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                    <span className="user-phone">{user.phone || 'No phone'}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {userDetails && (
              <div className="user-details">
                <h3>User Details</h3>
                <div className="user-profile">
                  <h4>{userDetails.user.name}</h4>
                  <p><strong>Email:</strong> {userDetails.user.email}</p>
                  <p><strong>Phone:</strong> {userDetails.user.phone || 'Not provided'}</p>
                </div>
                
                <div className="user-assessments">
                  <h4>Assessment History ({userDetails.assessments.length})</h4>
                  {userDetails.assessments.map(assessment => (
                    <div key={assessment._id} className="assessment-item" onClick={() => setSelectedAssessment(assessment)}>
                      <div className="assessment-header">
                        <span className={`dosha-badge ${assessment.results.dominant.toLowerCase()}`}>
                          {assessment.results.dominant}
                        </span>
                        <span className="assessment-date">
                          {new Date(assessment.completedAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="dosha-breakdown">
                        <span>Vata: {assessment.results.percentages.Vata}%</span>
                        <span>Pitta: {assessment.results.percentages.Pitta}%</span>
                        <span>Kapha: {assessment.results.percentages.Kapha}%</span>
                      </div>
                      <div className="view-details">Click to view details</div>
                    </div>
                  ))}
                </div>
                
                <div className="user-todos">
                  <h4>All Todos ({userDetails.todos?.length || 0})</h4>
                  <div className="todos-grid-admin">
                    {userDetails.todos?.map(todo => (
                      <div key={todo._id} className="todo-card-detailed">
                        <div className="todo-header-detailed">
                          <span className={`todo-status ${todo.completed ? 'completed' : 'pending'}`}>
                            {todo.completed ? '✅' : '⏳'}
                          </span>
                          <span className={`category-badge ${todo.category}`}>{todo.category}</span>
                          <span className={`priority-badge priority-${todo.priority}`}>{todo.priority}</span>
                        </div>
                        <h5>{todo.title}</h5>
                        {todo.description && <p className="todo-desc">{todo.description}</p>}
                        <div className="todo-meta-detailed">
                          <span>Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
                          {todo.completed && <span>Completed: {new Date(todo.completedAt).toLocaleDateString()}</span>}
                        </div>
                      </div>
                    )) || <p>No todos found</p>}
                  </div>
                </div>
                
                <div className="user-health">
                  <h4>Health Tracking Data ({userDetails.healthData?.length || 0} entries)</h4>
                  <div className="health-grid-admin">
                    {userDetails.healthData?.map(health => (
                      <div key={health._id} className="health-card-detailed">
                        <div className="health-date">{new Date(health.date).toLocaleDateString()}</div>
                        <div className="health-metrics">
                          <div className="metric">💧 Water: {health.waterIntake || 0} glasses</div>
                          <div className="metric">🏃 Exercise: {health.exerciseMinutes || 0} min</div>
                          <div className="metric">😴 Sleep: {health.sleepHours || 0} hrs</div>
                          {health.mood && <div className="metric">😊 Mood: {health.mood}</div>}
                        </div>
                        {health.notes && <div className="health-notes-admin">{health.notes}</div>}
                      </div>
                    )) || <p>No health data found</p>}
                  </div>
                </div>
                
                <div className="user-reports">
                  <h4>Generated Reports ({userDetails.reports?.length || 0})</h4>
                  <div className="reports-grid-admin">
                    {userDetails.reports?.map(report => (
                      <div key={report._id} className="report-card-detailed">
                        <div className="report-header-detailed">
                          <h5>{report.type.charAt(0).toUpperCase() + report.type.slice(1)} Report</h5>
                          <span className="report-date-detailed">{new Date(report.date).toLocaleDateString()}</span>
                        </div>
                        <div className="report-stats-detailed">
                          <div className="stat-row">
                            <span>Tasks: {report.data.completedTodos}/{report.data.totalTodos}</span>
                            <span>Water: {report.data.waterIntake} glasses</span>
                          </div>
                          <div className="stat-row">
                            <span>Exercise: {report.data.exerciseMinutes} min</span>
                            <span>Sleep: {report.data.sleepHours} hrs</span>
                          </div>
                        </div>
                        {report.suggestions?.length > 0 && (
                          <div className="suggestions-admin">
                            <strong>Suggestions:</strong>
                            <ul>
                              {report.suggestions.map((suggestion, idx) => (
                                <li key={idx}>{suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )) || <p>No reports found</p>}
                  </div>
                </div>
                </div>
            )}
          </div>
        )}

        {activeTab === 'assessments' && (
          <div className="assessments-section">
            <h3>All Assessments</h3>
            <div className="assessments-list">
              {assessments.map(assessment => (
                <div key={assessment._id} className="assessment-card" onClick={() => setSelectedAssessment(assessment)}>
                  <div className="assessment-user">
                    <h4>{assessment.userId?.name || 'Unknown User'}</h4>
                    <p>{assessment.userId?.email}</p>
                  </div>
                  <div className="assessment-results">
                    <span className={`dosha-badge ${assessment.results.dominant.toLowerCase()}`}>
                      {assessment.results.dominant}
                    </span>
                    <div className="percentages">
                      V: {assessment.results.percentages.Vata}% | 
                      P: {assessment.results.percentages.Pitta}% | 
                      K: {assessment.results.percentages.Kapha}%
                    </div>
                  </div>
                  <div className="assessment-date">
                    {new Date(assessment.completedAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'todos' && (
          <div className="todos-section">
            <h3>All Todos</h3>
            <div className="todos-list-admin">
              {todos.map(todo => (
                <div key={todo._id} className="todo-card-admin">
                  <div className="todo-user">
                    <h4>{todo.userId?.name || 'Unknown User'}</h4>
                    <p>{todo.userId?.email}</p>
                  </div>
                  <div className="todo-details">
                    <div className="todo-title-admin">{todo.title}</div>
                    <div className="todo-meta">
                      <span className={`category-badge ${todo.category}`}>{todo.category}</span>
                      <span className={`priority-badge ${todo.priority}`}>{todo.priority}</span>
                      <span className={`status-badge ${todo.completed ? 'completed' : 'pending'}`}>
                        {todo.completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                  <div className="todo-date-admin">
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-section">
            <h3>All Reports</h3>
            <div className="reports-list-admin">
              {reports.map(report => (
                <div key={report._id} className="report-card-admin">
                  <div className="report-user">
                    <h4>{report.userId?.name || 'Unknown User'}</h4>
                    <p>{report.userId?.email}</p>
                  </div>
                  <div className="report-details">
                    <div className="report-type-admin">{report.type} Report</div>
                    <div className="report-data">
                      <span>Tasks: {report.data.completedTodos}/{report.data.totalTodos}</span>
                      <span>Water: {report.data.waterIntake}g</span>
                      <span>Exercise: {report.data.exerciseMinutes}m</span>
                      <span>Sleep: {report.data.sleepHours}h</span>
                    </div>
                    {report.suggestions.length > 0 && (
                      <div className="report-suggestions-admin">
                        <strong>Suggestions:</strong> {report.suggestions.join(', ')}
                      </div>
                    )}
                  </div>
                  <div className="report-date-admin">
                    {new Date(report.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <AssessmentModal 
        assessment={selectedAssessment} 
        onClose={() => setSelectedAssessment(null)} 
      />
    </div>
  );
}