import { useEffect, useState } from "react";
import { Pen } from "lucide-react";
import UpdateUserModal from "./UpdateUserModal"; // Import the update modal
import UserDetailsModal from "./UserDetailsModal"; // Import the details modal
import "./UserTable.css";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = async (userId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/update-user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      // Refresh the user list
      const updatedUsers = users.map((user) =>
        user.user_id === userId ? { ...user, ...updatedData } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating user:", error);
      alert(error.message); // Show the error message to the user
    }
  };

  const handleDelete = (userId) => {
    // Remove the deleted user from the list
    setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
  };

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td onClick={() => {
                setSelectedUserId(user.user_id);
                setIsDetailsModalOpen(true);
              }} style={{ cursor: "pointer", color: "blue" }}>
                {user.user_id}
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.department}</td>
              <td>
                <button
                  className="update-button"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsUpdateModalOpen(true);
                  }}
                  aria-label="Update User"
                >
                  <Pen className="pen-icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isUpdateModalOpen && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}

      {isDetailsModalOpen && (
        <UserDetailsModal
          userId={selectedUserId}
          onClose={() => setIsDetailsModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default UserTable;