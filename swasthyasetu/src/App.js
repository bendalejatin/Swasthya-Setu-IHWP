import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Login from './Components/Login/Login.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import Home from './Components/Home/Home.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Features from './Components/Features/Features.jsx';
import DoshaAssessment from './Components/Quiz/DoshaAssessment.jsx';
import Profile from './Components/Profile/Profile.jsx';
import Resources from './Components/Resources/Resources.jsx';
import About from './Components/About/About.jsx';
import TodoManager from './Components/TodoManager/TodoManager.jsx';


function AppLayout() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="App">
      {!hideHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/features" element={<Features />} />
        <Route path="/dosha-assessment" element={<DoshaAssessment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/todo-manager" element={<TodoManager />} />
        <Route path="/resources" element={<Resources/>} />
        <Route path="/about" element={<About />} />

      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
