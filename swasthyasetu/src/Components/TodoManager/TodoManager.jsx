import React, { useState, useEffect } from 'react';
import './TodoManager.css';

const TodoManager = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [todos, setTodos] = useState([]);
  const [healthData, setHealthData] = useState({});
  const [reports, setReports] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', category: 'general', priority: 'medium' });
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      loadTodos();
      loadHealthData();
      loadReports();
    }
  }, []);

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  const loadTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error loading todos:', error);
      setTodos([]);
    }
  };

  const loadHealthData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/health', {
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setHealthData(data);
    } catch (error) {
      console.error('Error loading health data:', error);
      setHealthData({ waterIntake: 0, exerciseMinutes: 0, sleepHours: 0, mood: '', notes: '' });
    }
  };

  const loadReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reports', {
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Error loading reports:', error);
      setReports([]);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newTodo)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const todo = await response.json();
      setTodos([todo, ...todos]);
      setNewTodo({ title: '', description: '', category: 'general', priority: 'medium' });
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Failed to add task. Please try again.');
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ completed })
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const updateHealthData = async (field, value) => {
    const updated = { ...healthData, [field]: value };
    setHealthData(updated);
    
    try {
      const response = await fetch('http://localhost:5000/api/health', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(updated)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating health data:', error);
      // Revert the change if save failed
      setHealthData(healthData);
    }
  };

  const generateReport = async (type = 'daily') => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/generate?type=${type}`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const report = await response.json();
      setReports([report, ...reports]);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    }
  };

  const updateTodo = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${editingTodo._id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(editingTodo)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo._id === editingTodo._id ? updatedTodo : todo));
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  const deleteReport = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/reports/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      setReports(reports.filter(report => report._id !== id));
    } catch (error) {
      console.error('Error deleting report:', error);
      alert('Failed to delete report. Please try again.');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return todo.category === filter;
  });

  const categoryIcons = {
    general: '📝',
    water: '💧',
    exercise: '🏃',
    food: '🍎',
    meditation: '🧘',
    sleep: '😴'
  };

  if (!user) {
    return (
      <div className="todo-manager">
        <div className="todo-hero">
          <h1>📋 Todo Manager</h1>
          <p>Organize your wellness journey with our comprehensive task and health tracking system.</p>
          <div className="todo-features">
            <div className="feature-card">
              <span className="feature-icon">✅</span>
              <h3>Task Management</h3>
              <p>Create and organize your daily tasks</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">💧</span>
              <h3>Health Tracking</h3>
              <p>Monitor water, exercise, and wellness</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📊</span>
              <h3>Progress Reports</h3>
              <p>Get insights and suggestions</p>
            </div>
          </div>
          <button className="cta-btn" onClick={() => window.location.href = '/login'}>
            Login to Access Todo Manager
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-manager">
      <div className="todo-header">
        <div className="todo-tagline">
          <span role="img" aria-label="wellness" className="todo-tagline-emoji">🌿</span>
          Wellness • Organization • Progress
        </div>
        <h1><span className="todo-title-green">Todo </span><span className="todo-title-yellow">Manager</span></h1>
        <p>Welcome back, {user.name}! Track your wellness journey with personalized task management.</p>
      </div>

      <div className="todo-content">
        <div className="todo-tabs">
          <button 
            className={activeTab === 'todos' ? 'active' : ''} 
            onClick={() => setActiveTab('todos')}
          >
            📝 Tasks
          </button>
          <button 
            className={activeTab === 'health' ? 'active' : ''} 
            onClick={() => setActiveTab('health')}
          >
            💪 Health Tracking
          </button>
          <button 
            className={activeTab === 'reports' ? 'active' : ''} 
            onClick={() => setActiveTab('reports')}
          >
            📊 Reports
          </button>
        </div>

        {activeTab === 'todos' && (
          <div className="todos-section">
            <div className="section-header">
              <h2>Task Management</h2>
              <p>Organize your wellness tasks with categories and priorities</p>
            </div>
            
            <form onSubmit={addTodo} className="add-todo-form">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTodo.title}
                onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={newTodo.description}
                onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
              />
              <select
                value={newTodo.category}
                onChange={(e) => setNewTodo({...newTodo, category: e.target.value})}
              >
                <option value="general">📝 General</option>
                <option value="water">💧 Water</option>
                <option value="exercise">🏃 Exercise</option>
                <option value="food">🍎 Food</option>
                <option value="meditation">🧘 Meditation</option>
                <option value="sleep">😴 Sleep</option>
              </select>
              <select
                value={newTodo.priority}
                onChange={(e) => setNewTodo({...newTodo, priority: e.target.value})}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
              <button type="submit">Add Task</button>
            </form>

            <div className="todo-filters">
              <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All ({todos.length})</button>
              <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pending ({todos.filter(t => !t.completed).length})</button>
              <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed ({todos.filter(t => t.completed).length})</button>
              <button className={filter === 'water' ? 'active' : ''} onClick={() => setFilter('water')}>💧 Water</button>
              <button className={filter === 'exercise' ? 'active' : ''} onClick={() => setFilter('exercise')}>🏃 Exercise</button>
              <button className={filter === 'food' ? 'active' : ''} onClick={() => setFilter('food')}>🍎 Food</button>
            </div>

            <div className="todos-list">
              {filteredTodos.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📝</span>
                  <h3>No tasks found</h3>
                  <p>Create your first wellness task to get started!</p>
                </div>
              ) : (
                filteredTodos.map(todo => (
                  <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}>
                    <div className="todo-content">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={(e) => toggleTodo(todo._id, e.target.checked)}
                        className="todo-checkbox"
                      />
                      <div className="todo-text">
                        <div className="todo-header-item">
                          <span className="todo-category">{categoryIcons[todo.category]}</span>
                          <h4>{todo.title}</h4>
                          <span className={`priority-badge priority-${todo.priority}`}>{todo.priority}</span>
                        </div>
                        {todo.description && <p>{todo.description}</p>}
                        <span className="todo-date">Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="todo-actions">
                      <button onClick={() => setEditingTodo(todo)} className="edit-btn">✏️</button>
                      <button onClick={() => deleteTodo(todo._id)} className="delete-btn">🗑️</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="health-section">
            <div className="section-header">
              <h2>Health Tracking</h2>
              <p>Monitor your daily wellness metrics and habits</p>
            </div>
            
            <div className="health-grid">
              <div className="health-card">
                <h3>💧 Water Intake</h3>
                <div className="counter">
                  <button onClick={() => updateHealthData('waterIntake', Math.max(0, (healthData.waterIntake || 0) - 1))}>-</button>
                  <span>{healthData.waterIntake || 0} glasses</span>
                  <button onClick={() => updateHealthData('waterIntake', (healthData.waterIntake || 0) + 1)}>+</button>
                </div>
                <div className="health-goal">Goal: 8-10 glasses</div>
              </div>

              <div className="health-card">
                <h3>🏃 Exercise</h3>
                <div className="counter">
                  <button onClick={() => updateHealthData('exerciseMinutes', Math.max(0, (healthData.exerciseMinutes || 0) - 15))}>-15</button>
                  <span>{healthData.exerciseMinutes || 0} minutes</span>
                  <button onClick={() => updateHealthData('exerciseMinutes', (healthData.exerciseMinutes || 0) + 15)}>+15</button>
                </div>
                <div className="health-goal">Goal: 30+ minutes</div>
              </div>

              <div className="health-card">
                <h3>😴 Sleep</h3>
                <div className="counter">
                  <button onClick={() => updateHealthData('sleepHours', Math.max(0, (healthData.sleepHours || 0) - 0.5))}>-0.5</button>
                  <span>{healthData.sleepHours || 0} hours</span>
                  <button onClick={() => updateHealthData('sleepHours', (healthData.sleepHours || 0) + 0.5)}>+0.5</button>
                </div>
                <div className="health-goal">Goal: 7-8 hours</div>
              </div>

              <div className="health-card">
                <h3>😊 Mood</h3>
                <select
                  value={healthData.mood || ''}
                  onChange={(e) => updateHealthData('mood', e.target.value)}
                >
                  <option value="">Select mood</option>
                  <option value="excellent">😄 Excellent</option>
                  <option value="good">😊 Good</option>
                  <option value="okay">😐 Okay</option>
                  <option value="poor">😔 Poor</option>
                  <option value="terrible">😢 Terrible</option>
                </select>
                <div className="health-goal">Track daily mood</div>
              </div>
            </div>

            <div className="health-notes">
              <h3>📝 Daily Notes</h3>
              <textarea
                placeholder="How are you feeling today? Any observations?"
                value={healthData.notes || ''}
                onChange={(e) => updateHealthData('notes', e.target.value)}
              />
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-section">
            <div className="section-header">
              <h2>Progress Reports</h2>
              <p>Generate insights and track your wellness journey progress</p>
            </div>
            
            <div className="report-actions">
              <button onClick={() => generateReport('daily')} className="report-btn">📊 Daily Report</button>
              <button onClick={() => generateReport('weekly')} className="report-btn">📈 Weekly Report</button>
              <button onClick={() => generateReport('monthly')} className="report-btn">📋 Monthly Report</button>
            </div>

            <div className="reports-list">
              {reports.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📊</span>
                  <h3>No reports generated yet</h3>
                  <p>Generate your first report to see wellness insights!</p>
                </div>
              ) : (
                reports.map(report => (
                  <div key={report._id} className="report-card">
                    <div className="report-header">
                      <h3>{report.type.charAt(0).toUpperCase() + report.type.slice(1)} Report</h3>
                      <span className="report-date">{new Date(report.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="report-stats">
                      <div className="stat">
                        <span className="stat-label">Tasks Completed:</span>
                        <span className="stat-value">{report.data.completedTodos}/{report.data.totalTodos}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Water Intake:</span>
                        <span className="stat-value">{report.data.waterIntake} glasses</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Exercise:</span>
                        <span className="stat-value">{report.data.exerciseMinutes} minutes</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Sleep:</span>
                        <span className="stat-value">{report.data.sleepHours} hours</span>
                      </div>
                    </div>

                    {report.suggestions.length > 0 && (
                      <div className="report-suggestions">
                        <h4>💡 Suggestions for Improvement:</h4>
                        <ul>
                          {report.suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button onClick={() => deleteReport(report._id)} className="delete-report-btn">🗑️ Delete</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      
      {editingTodo && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editingTodo.title}
              onChange={(e) => setEditingTodo({...editingTodo, title: e.target.value})}
            />
            <input
              type="text"
              value={editingTodo.description}
              onChange={(e) => setEditingTodo({...editingTodo, description: e.target.value})}
            />
            <select
              value={editingTodo.category}
              onChange={(e) => setEditingTodo({...editingTodo, category: e.target.value})}
            >
              <option value="general">📝 General</option>
              <option value="water">💧 Water</option>
              <option value="exercise">🏃 Exercise</option>
              <option value="food">🍎 Food</option>
              <option value="meditation">🧘 Meditation</option>
              <option value="sleep">😴 Sleep</option>
            </select>
            <select
              value={editingTodo.priority}
              onChange={(e) => setEditingTodo({...editingTodo, priority: e.target.value})}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
            <div className="edit-modal-actions">
              <button onClick={updateTodo} className="save-btn">Save</button>
              <button onClick={() => setEditingTodo(null)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoManager;