import "./NavbarAdmin.css"
import { useNavigate } from "react-router-dom";
function Navbar(){
    const navigate = useNavigate();
    return(
            <nav className="nav">
                <a onClick={() => navigate("/HomePageAdmin")} className="home">Home</a>
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