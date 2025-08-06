import React, { useState } from "react";
import "./UserProfile.scss";
import AddressManager from "./AddressManager/AddressManager";
import OrderHistory from "./OrderHistory/OrderHistory";
import EditProfile from "./EditProfile/EditProfile";

interface UserProfileProps {
  open: boolean;
  onClose: () => void;
  user: {
    fullName: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  onLogout: () => void;
}

type ActiveTab = "profile" | "addresses" | "orders";

const UserProfile: React.FC<UserProfileProps> = ({
  open,
  onClose,
  user,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  const handleOverlayClick = () => {
    // Only close on desktop (screen width > 768px)
    if (window.innerWidth > 768) {
      onClose();
    }
  };

  const menuItems = [
    {
      key: "profile" as ActiveTab,
      label: "Edit Profile",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      key: "addresses" as ActiveTab,
      label: "Saved Addresses",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      key: "orders" as ActiveTab,
      label: "Order History",
      icon: (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <EditProfile user={user} onUpdate={() => {}} />;
      case "addresses":
        return <AddressManager />;
      case "orders":
        return <OrderHistory />;
      default:
        return null;
    }
  };

  return (
    <div className={`user-profile${open ? " open" : ""}`}>
      <div className="user-profile__overlay" onClick={handleOverlayClick}></div>
      <div className="user-profile__content">
        <div className="user-profile__header">
          <div className="user-profile__user-info">
            <div className="user-profile__avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.fullName} />
              ) : (
                <div className="user-profile__avatar-placeholder">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="user-profile__details">
              <h3 className="user-profile__name">{user.fullName}</h3>
              <p className="user-profile__email">{user.email}</p>
            </div>
          </div>
          <button className="user-profile__close" onClick={onClose}>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="user-profile__body">
          <div className="user-profile__sidebar">
            <nav className="user-profile__nav">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  className={`user-profile__nav-item ${
                    activeTab === item.key ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(item.key)}
                >
                  <span className="user-profile__nav-icon">{item.icon}</span>
                  <span className="user-profile__nav-label">{item.label}</span>
                </button>
              ))}
            </nav>

            <button className="user-profile__logout" onClick={handleLogout}>
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>

          <div className="user-profile__main">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
