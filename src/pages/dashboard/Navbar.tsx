import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  interface User {
    username: string;
  }

  const userJson = localStorage.getItem("user");
  const user: User | null = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="navbar">
      <NavLink to="/dashboard">
        <h3>Dashboard</h3>
      </NavLink>
      {user ? (
        <div className="profile">
          <p>{user.username}</p>
          <button className="logout-btn" onClick={handleLogout}>
            logout
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Navbar;
