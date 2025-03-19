import "./NavbarAdmin.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronDown, LogOut, User } from "lucide-react"; // Import ChevronDown and User icons

function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state

  // Logout Function
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token"); // Replace "token" with your actual key

    // Redirect to the login page
    navigate("/");

    // Close the dropdown
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Left Side: Home Button */}
      <div className="navbar-left">
        <button onClick={() => navigate("/HomePageAdmin")} className="home-button">
          Home
        </button>
      </div>

      {/* Right Side: Links and Profile Dropdown */}
      <div className="navbar-right">
        <ul className="navbar-links">
          <li>
            <button onClick={() => navigate("/UserManagePage")} className="nav-link">
              Users
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/newEx")} className="nav-link">
              New Expense
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/expenses")} className="nav-link">
              Expense Management
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/analysis")} className="nav-link">
              Analysis
            </button>
          </li>
        </ul>

        {/* Profile Dropdown */}
        <div className="profile-dropdown">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="profile-button"
            aria-expanded={isDropdownOpen}
            aria-label="Profile Menu"
          >
            <ChevronDown className={`dropdown-icon ${isDropdownOpen ? "rotate" : ""}`} />
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              {/* View Profile Option */}
              <Link
                to="/profile"
                className="dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                <User className="dropdown-item-icon" />
                View Profile
              </Link>

              {/* Logout Option */}
              <button
                onClick={handleLogout} // Call the logout function
                className="dropdown-item"
              >
                <LogOut className="dropdown-item-icon" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;