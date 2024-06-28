// lab-express-connect-react/src/Components/navbar/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/logs" className="navbar__home">
        Capitain's Log
      </Link>
      <Link to="/logs/new" className="navbar__new">
        New Log
      </Link>
    </nav>
  );
}
