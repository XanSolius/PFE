import { useNavigate } from "react-router-dom";
import "./HeaderUserManagement.css"

function UserManagementH({ searchTerm, setSearchTerm }) {
    const navigate = useNavigate();

    return (
        <div className="UserManagementH">
            <h3>User Management</h3>
            <input
                type="text"
                placeholder="Enter user name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="choiceboxuser">
                <select>
                    <option>All Users</option>
                    <option>Employee</option>
                    <option>Accountant</option>
                    <option>Manager</option>
                </select>
            </div>
            <button onClick={() => navigate("/AddUserPage")}>Add User</button>
        </div>
    );
}

export default UserManagementH;
