import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import '../src/pages/dashboard/Dashboard.module.css';
import './App.css'

export const ENDPOINT = "http://localhost:5000";
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
      </Router>
  );
};

export default App;