import "./NavbarAdmin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ChevronRight, LogOut } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // Dropdown state

  return (
    <nav className="nav">
      <div className="flex justify-between items-center w-full">
        <ul>
          <li>
        {/* Home Button */}
        <a onClick={() => navigate("/HomePageAdmin")} className="home">
          Home
        </a>
        </li>
        {/* Profile Dropdown */}
        
          <button style={{
                           backgroundColor: 'rgb(83, 58, 58)',
                           alignItems: 'center',     // Vertically center the icon
                           justifyContent: 'center', // Horizontally center the icon
                           padding: '10px',           // Add padding to create space inside the button
                           marginTop:'18px'
                           }} onClick={() => setOpen(!open)} className="ProfileButtonNav">
           
           <ChevronRight className="w-4 h-4 text-white" />
          </button>

          
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border">
              <Link
                to="/logout"
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Link>
            </div>
          )}

</ul>
        
      </div>

      {/* Navbar Links */}
      <ul>
        <li>
          <a onClick={() => navigate("/UserManagePage")}>Users</a>
        </li>
        <li>
          <a href="/newEx">New Expense</a>
        </li>
        <li>
          <a href="/expenses">Expense Management</a>
        </li>
        <li>
          <a href="/newEx">Analysis</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
