import { useState } from "react";
import "./UpdateUserModal.css"; // Import the CSS file

function UpdateUserModal({ user, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    role: user.role, // Role will be either "Employee" or "Accountant"
    department: user.department, // Department will be one of the dropdown options
    password: "", // New password field
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle role selection (radio button logic)
  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate(user.user_id, formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role Field (Radio Buttons) */}
          <div className="form-group">
            <label>Role</label>
            <div className="role-options">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Employee"
                  checked={formData.role === "Employee"}
                  onChange={() => handleRoleChange("Employee")}
                />
                Employee
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Accountant"
                  checked={formData.role === "Accountant"}
                  onChange={() => handleRoleChange("Accountant")}
                />
                Accountant
              </label>
            </div>
          </div>

          {/* Department Field (Dropdown) */}
          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="Administration">Administration</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
            </select>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
            />
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserModal;