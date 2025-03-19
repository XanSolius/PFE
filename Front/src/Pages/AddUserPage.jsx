import AddUser from "../assets/AddUser.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function AddUserPage() {
  const navigate = useNavigate(); // Initialize useNavigate

  // State for form fields
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee"); // Default role is "employee"
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [errors, setErrors] = useState({});

  // Validate form function
  const validateForm = () => {
    const newErrors = {};

    // Check if all fields are filled
    if (!userId) newErrors.userId = "User ID is required";
    if (!name) newErrors.name = "Name is required";
    if (!password) newErrors.password = "Password is required";
    if (!role) newErrors.role = "Role is required";
    if (!email) newErrors.email = "Email is required";
    if (!department) newErrors.department = "Department is required";

    // Validate User ID is a number
    if (isNaN(Number(userId))) {
      newErrors.userId = "User ID must be a number";
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
        try {
            const response = await fetch('http://localhost:3000/api/users/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    name,
                    password,
                    role,
                    email,
                    department,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // User added successfully
                // Clear form fields
                setUserId('');
                setName('');
                setPassword('');
                setRole('employee');
                setEmail('');
                setDepartment('');
                setErrors({});
            } else {
                alert(data.message); // Show error message
            }
        } catch (error) {
            console.error(error);
            alert('Failed to add user. Please try again.');
        }
    }
};

  return (
    <div
      style={{
        backgroundImage: `url(${AddUser})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Return to Home Link */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          cursor: "pointer",
          color: "#007BFF",
          fontWeight: "bold",
        }}
        onClick={() => navigate("/UserManagePage")} // Navigate to users page
      >
        Return to Users Page
      </div>

      {/* Form Container */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add New User</h2>
        <form onSubmit={handleSubmit}>
          {/* User ID Field */}
          <div style={{ marginBottom: "15px" }}>
            <label>User ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            {errors.userId && <span style={{ color: "red", fontSize: "14px" }}>{errors.userId}</span>}
          </div>

          {/* Name Field */}
          <div style={{ marginBottom: "15px" }}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            {errors.name && <span style={{ color: "red", fontSize: "14px" }}>{errors.name}</span>}
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "15px" }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            {errors.password && <span style={{ color: "red", fontSize: "14px" }}>{errors.password}</span>}
          </div>

          {/* Role Field (Dropdown) */}
          <div style={{ marginBottom: "15px" }}>
            <label>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            >
              <option value="employee">Employee</option>
              <option value="accountant">Accountant</option>
            </select>
            {errors.role && <span style={{ color: "red", fontSize: "14px" }}>{errors.role}</span>}
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: "15px" }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            {errors.email && <span style={{ color: "red", fontSize: "14px" }}>{errors.email}</span>}
          </div>

          {/* Department Field */}
          <div style={{ marginBottom: "15px" }}>
            <label>Department:</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            {errors.department && <span style={{ color: "red", fontSize: "14px" }}>{errors.department}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUserPage;