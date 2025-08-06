import React, { useState } from "react";
import "./EditProfile.scss";

interface User {
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
}

interface EditProfileProps {
  user: User;
  onUpdate: (userData: User) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate and update user data
    onUpdate({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      avatar: user.avatar,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="edit-profile">
      <div className="edit-profile__header">
        <h2 className="edit-profile__title">Profile Information</h2>
        {!isEditing && (
          <button
            className="edit-profile__edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      <form className="edit-profile__form" onSubmit={handleSubmit}>
        <div className="edit-profile__avatar-section">
          <div className="edit-profile__avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.fullName} />
            ) : (
              <div className="edit-profile__avatar-placeholder">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {isEditing && (
            <button type="button" className="edit-profile__avatar-btn">
              Change Photo
            </button>
          )}
        </div>

        <div className="edit-profile__fields">
          <div className="edit-profile__field">
            <label className="edit-profile__label">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="edit-profile__input"
            />
          </div>

          <div className="edit-profile__field">
            <label className="edit-profile__label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="edit-profile__input"
            />
          </div>

          <div className="edit-profile__field">
            <label className="edit-profile__label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="edit-profile__input"
              placeholder="Enter phone number"
            />
          </div>

          {isEditing && (
            <>
              <div className="edit-profile__divider">
                <span>Change Password (Optional)</span>
              </div>

              <div className="edit-profile__field">
                <label className="edit-profile__label">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="edit-profile__input"
                  placeholder="Enter current password"
                />
              </div>

              <div className="edit-profile__field">
                <label className="edit-profile__label">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="edit-profile__input"
                  placeholder="Enter new password"
                />
              </div>

              <div className="edit-profile__field">
                <label className="edit-profile__label">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="edit-profile__input"
                  placeholder="Confirm new password"
                />
              </div>
            </>
          )}
        </div>

        {isEditing && (
          <div className="edit-profile__actions">
            <button
              type="button"
              className="edit-profile__cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="edit-profile__save">
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
