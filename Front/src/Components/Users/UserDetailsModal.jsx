import { useEffect, useState } from "react";
import "./UserDetailsModal.css"; // Optional: Add custom CSS for the modal

function UserDetailsModal({ userId, onClose, onDelete }) {
  const [user, setUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Fetch user details when the modal opens
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Handle delete confirmation
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/delete-user/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }

      onDelete(userId); // Notify the parent component to update the user list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(error.message); // Show the error message to the user
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>User Details</h2>
        <div className="user-details">
          <p><strong>User ID:</strong> {user.user_id}</p>
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Department:</strong> {user.department}</p>
        </div>

        {/* Delete Button (Disabled for admin users) */}
        {user.role !== 'admin' && (
          <button
            className="delete-button"
            onClick={() => setShowConfirmation(true)}
          >
            Delete User
          </button>
        )}

        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className="confirmation-dialog">
            <p>Are you sure you want to delete this user?</p>
            <div className="confirmation-buttons">
              <button onClick={handleDelete}>Yes, Delete</button>
              <button onClick={() => setShowConfirmation(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default UserDetailsModal;